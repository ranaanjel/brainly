import { NextFunction, Request, Response, Express } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET as string;

declare global {
    namespace Express {
        export interface Request {
            userId?: string
        }
    }
}

export const authMiddleware = function (req:Request, res:Response, next:NextFunction) {
    const authToken = req.headers.authorization as string;

    try {
        const decode = jwt.verify(authToken, jwtSecret)
        req.userId = (decode as JwtPayload).id ;
        next();
    }catch(err) {
        res.status(403).json({
            message:"signin first - not authorized"
        })
    }
}