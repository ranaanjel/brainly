import express, { urlencoded } from "express"
import { Request, Response, NextFunction } from "express";
import { inputValid } from "../middlewares/validMiddleware";
const userRouter = express.Router();
import { ContentModel, TagModel, UserModel, ShareLinkModel } from "../db/db";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { authMiddleware } from "../middlewares/authMiddlewares";
import {tagMiddleware} from "../middlewares/tagMiddleware"
import crypto from "crypto"

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
export enum contentTypes {
    image="image",
    video="video",
    article="article",
    audio="audio"
}

interface contentValues {
    link : string,
    title:string,
    tag:string[],
    type: contentTypes,
    //user id will added to the content separately 
}

userRouter.post("/content", authMiddleware, tagMiddleware,async function (req:Request, res:Response) { 

    let {link, title, tag, type} : contentValues = req.body;
    //console.log(link, title, tag, type)

    // getting the reference for each tag if not present creating one.

    try {
        console.log("before tag check")
        const content = await ContentModel.create({
            link, title, type, tag, userId:req.userId
        })
        //console.log(content)
        res.json({
            content
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message:"server not able to store the content"
        })
    }
})
userRouter.get("/content", authMiddleware, async function (req:Request, res:Response) {

    const userId = req.userId;

    const contents = await ContentModel.find({
        userId
    })
    
    res.json({
        contents
    })


 })
userRouter.delete("/content", authMiddleware,async function (req:Request, res:Response) {
    
    let contentId = req.body.contentId;

    let deleteContent = await ContentModel.deleteOne({_id:contentId, userId:req.userId})
    //console.log(contentId, req.userId, deleteContent)
    res.json({
        message:"deleted the content"
    })
    
 })

//share the content i.e visible to others

//sharing the particular content i.e all notes, tweets or videos and tags values
userRouter.post("/brain/share", authMiddleware, async function (req:Request, res:Response) {
    let {share} : {share:boolean} = req.body;
    let userId = req.userId;
    try {
    if(share) {
        const hash = crypto.createHash("sha256").update(userId as string).digest("hex");
        const link = await ShareLinkModel.create({
            hash,
            userId
        })
        let URL = ( req.protocol+"//:"+ req.get("host")+"/brain/"+ link.hash)
        
        res.json({
            URL,
            message:"content shared"
        })
        return;
    } else {
        // meaning to delete the shareable URL meaning does not existing in the sharelinks document
        //assuming that whole second brain is shared not pieces of it.
        await ShareLinkModel.deleteOne({
            userId
        })

        res.json({
            message:"not shared anymore"
        })
    }}
    catch(err) {
        res.json({message:"already shareable"})
    }

})

//copying the particular content of others
userRouter.get("/brain/:shareLink", authMiddleware,async function (req:Request, res:Response) {
    let hash = req.params.shareLink;
    let userId = req.userId;

   let hashValue =await ShareLinkModel.findOne({
    hash
   }).populate("userId");

   if(hashValue == null) {
    res.status(404).json({
        message:"no such content exist"
    })
    return;
   }

   //@ts-ignore
   const username = hashValue.userId.name;
   const content = await ContentModel.find({userId})

   
    res.json({
        value : {
          username, content
        },
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