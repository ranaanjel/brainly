"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const authMiddleware = function (req, res, next) {
    const authToken = req.headers.authorization;
    try {
        const decode = jsonwebtoken_1.default.verify(authToken, jwtSecret);
        req.userId = decode.id;
        next();
    }
    catch (err) {
        res.status(403).json({
            message: "signin first - not authorized"
        });
    }
};
exports.authMiddleware = authMiddleware;
