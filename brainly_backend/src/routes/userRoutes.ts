import express, { urlencoded } from "express"
import { Request, Response, NextFunction } from "express";
import { inputValid } from "../middlewares/validMiddleware";
const userRouter = express.Router();
import { UserModel } from "../db/db";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { authMiddleware } from "../middlewares/authMiddlewares";

const jwtSecret:string = String(process.env.JWT_SECRET);

userRouter.get("/", function(req:Request, res:Response) {
    res.redirect("/user/content")
})

interface UserBody {
    name:string,
    password:string
}

userRouter.post("/signup",inputValid, async function (req:Request, res:Response) {
    let userBody : UserBody= req.body;

    //hashing the password;

    const hashPassword : string = await bcrypt.hash(userBody.password, 4)
    //console.log(hashPassword)
    try {
        await UserModel.create({
            name:userBody.name,
            password:hashPassword
        })
        //console.log(userBody)
        res.status(200).json({
            message:"signup successful please signin now"
        })
    } catch(err) {
        res.status(403).json({
            message:"user already exists"
        })
    }
})

userRouter.post("/signin",async function (req:Request, res:Response) {
    const userBody:UserBody = req.body;

    try {
        let user = await UserModel.findOne({name:userBody.name})
        if(user == null) {
            throw new Error();
        }
        let passwordMatch = await bcrypt.compare(userBody.password, user.password)
        console.log(user, passwordMatch)
        if(user && passwordMatch){
            const payload = {
                id:user._id
            }
            const token = jwt.sign(payload, jwtSecret)
            res.json({
                token
            })

        }else {
            res.status(403).json({
                message:"user's invalid credentialss"
            })
        }


    }
    catch(err) {
        res.status(500).json({
            message:"some server error"
        })
    }

})

//content related
userRouter.get("/content", authMiddleware,  function (req:Request, res:Response) { 

    res.json({
        message:"content get"
    })
})
userRouter.post("/content", authMiddleware,function (req:Request, res:Response) {

    res.json({
        message:"content post"
    })
 })
userRouter.delete("/content", authMiddleware,function (req:Request, res:Response) {
    
    res.json({
        message:"content delete"
    })
 })

//share the content i.e visible to others

//sharing the particular content i.e all notes, tweets or videos and tags values
userRouter.post("/brain/share", authMiddleware,function (req:Request, res:Response) {

    res.json({
        message:"content share our"
    })
})

//copying the particular content of others
userRouter.get("/brain/:shareLink", authMiddleware,function (req:Request, res:Response) {
    res.json({
        message:"content share copy from others"
    })
})
//handling in case of other pages request
userRouter.get("*", function (req:Request, res:Response) {
    res.status(404).json({
        message:"content not found"
    })
})



export {userRouter}