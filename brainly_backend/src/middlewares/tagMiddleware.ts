import { Request, Response, NextFunction } from "express";
import mongoose, { Types} from "mongoose";
import { TagModel } from "../db/db";

export const tagMiddleware = function (req:Request, res:Response, next:NextFunction) {
    let {tag}:{tag:string[]} = req.body;

    let tagRef:string[] = []

     tag.forEach(async function (tagN,index) {
        try {
          
            let tagDocument = await TagModel.find({title:tagN});
            if(tagDocument.length == 0) {
                throw new Error("does not exist")
            }
            //@ts-ignore
            tagRef.push(tagDocument[0]["_id"].toString())
            if(index == tag.length-1) {
                req.body.tag = tagRef;
                next()
            }
        }
        catch(err) {
            let newTag = await TagModel.create({
                title:tagN
            })
            tagRef.push(newTag._id.toString())
            if(index == tag.length-1) {
                req.body.tag = tagRef;
                next()
            }
        }
    })
}