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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.contentTypes = void 0;
const express_1 = __importDefault(require("express"));
const validMiddleware_1 = require("../middlewares/validMiddleware");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const tagMiddleware_1 = require("../middlewares/tagMiddleware");
const jwtSecret = String(process.env.JWT_SECRET);
userRouter.get("/", function (req, res) {
    res.redirect("/user/content");
});
userRouter.post("/signup", validMiddleware_1.inputValid, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userBody = req.body;
        //hashing the password;
        const hashPassword = yield bcrypt_1.default.hash(userBody.password, 4);
        //console.log(hashPassword)
        try {
            yield db_1.UserModel.create({
                name: userBody.name,
                password: hashPassword
            });
            //console.log(userBody)
            res.status(200).json({
                message: "signup successful please signin now"
            });
        }
        catch (err) {
            res.status(403).json({
                message: "user already exists"
            });
        }
    });
});
userRouter.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userBody = req.body;
        try {
            let user = yield db_1.UserModel.findOne({ name: userBody.name });
            if (user == null) {
                throw new Error();
            }
            let passwordMatch = yield bcrypt_1.default.compare(userBody.password, user.password);
            console.log(user, passwordMatch);
            if (user && passwordMatch) {
                const payload = {
                    id: user._id
                };
                const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
                res.json({
                    token
                });
            }
            else {
                res.status(403).json({
                    message: "user's invalid credentialss"
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: "some server error"
            });
        }
    });
});
//content related
var contentTypes;
(function (contentTypes) {
    contentTypes["image"] = "image";
    contentTypes["video"] = "video";
    contentTypes["article"] = "article";
    contentTypes["audio"] = "audio";
})(contentTypes || (exports.contentTypes = contentTypes = {}));
userRouter.post("/content", authMiddlewares_1.authMiddleware, tagMiddleware_1.tagMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { link, title, tag, type } = req.body;
        console.log(link, title, tag, type);
        // getting the reference for each tag if not present creating one.
        try {
            console.log("before tag check");
            const content = yield db_1.ContentModel.create({
                link, title, type, tag, userId: req.userId
            });
            console.log(content);
            res.json({
                content
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: "server not able to store the content"
            });
        }
    });
});
userRouter.get("/content", authMiddlewares_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const contents = yield db_1.ContentModel.find({
            userId
        });
        res.json({
            contents
        });
    });
});
userRouter.delete("/content", authMiddlewares_1.authMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let contentId = req.body.contentId;
        yield db_1.ContentModel.deleteOne({ _id: contentId, userId: req.userId });
        res.json({
            message: "deleted the content"
        });
    });
});
//share the content i.e visible to others
//sharing the particular content i.e all notes, tweets or videos and tags values
userRouter.post("/brain/share", authMiddlewares_1.authMiddleware, function (req, res) {
    res.json({
        message: "content share our"
    });
});
//copying the particular content of others
userRouter.get("/brain/:shareLink", authMiddlewares_1.authMiddleware, function (req, res) {
    res.json({
        message: "content share copy from others"
    });
});
//handling in case of other pages request
userRouter.get("*", function (req, res) {
    res.status(404).json({
        message: "content not found"
    });
});
