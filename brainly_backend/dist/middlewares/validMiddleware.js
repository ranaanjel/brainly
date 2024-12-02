"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValid = void 0;
const zod_1 = __importDefault(require("zod"));
var userSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).max(10),
    password: zod_1.default.string().regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])[A-z\d!@#$%^&]{8,20}/)
});
const inputValid = function (req, res, next) {
    const userBody = req.body;
    const valid = userSchema.safeParse(userBody);
    //console.log(userBody , "from inputvalid function")
    if (valid.success) {
        next();
        return;
    }
    res.status(411).json({
        message: "please provide good inputs"
    });
};
exports.inputValid = inputValid;
