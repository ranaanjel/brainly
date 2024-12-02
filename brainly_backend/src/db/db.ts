import mongoose,{model, Schema, Types} from "mongoose";
import {contentTypes} from "../routes/userRoutes"

const UserSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

export const UserModel = mongoose.model("User", UserSchema)

const ContentSchema = new Schema({
    title:{type:String, required:true},
    link:{type:String, required:true},
    type:{type:String, enum:contentTypes, required:true},
    tag:[{type:Types.ObjectId, ref:"Tag"}],
    userId:{type:Types.ObjectId, ref:"User", required:true}
});
export const ContentModel = model("Content", ContentSchema);

const TagSchema = new Schema({
    title:{type:String, unique:true, required:true}
})
export const TagModel = model("Tag", TagSchema);


//sharing all the contents
const ShareLinkSchema = new Schema({
    hash:{type:String, required
        :true
    },
    userId:{
        type:Types.ObjectId, required:true, ref:"User"
    }
})
export const ShareLinkModel = model("ShareLink", ShareLinkSchema)
