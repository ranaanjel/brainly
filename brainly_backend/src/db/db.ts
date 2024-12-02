import mongoose,{model, Schema} from "mongoose";

let databaseURL = process.env.DATABASE_URL
 
console.log(databaseURL)

mongoose.connect(databaseURL + "brainly").then(function(err) {
    console.log("connected to database")
})

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

export const UserModel = mongoose.model("User", userSchema)

const ContentSchema = new Schema();
export const ContentModel = model("Content", ContentSchema);