"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagMiddleware = void 0;
const db_1 = require("../db/db");
const tagMiddleware = function (req, res, next) {
    let { tag } = req.body;
    let tagRef = [];
    tag.forEach(function (tagN, index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tagDocument = yield db_1.TagModel.find({ title: tagN });
                if (tagDocument.length == 0) {
                    throw new Error("does not exist");
                }
                //@ts-ignore
                tagRef.push(tagDocument[0]["_id"].toString());
                if (index == tag.length - 1) {
                    req.body.tag = tagRef;
                    next();
                }
            }
            catch (err) {
                let newTag = yield db_1.TagModel.create({
                    title: tagN
                });
                tagRef.push(newTag._id.toString());
                if (index == tag.length - 1) {
                    req.body.tag = tagRef;
                    next();
                }
            }
        });
    });
};
exports.tagMiddleware = tagMiddleware;
