import { NextFunction, Request, Response} from "express";
import zod from "zod"

var userSchema = zod.object({
    name:zod.string().min(3).max(10),
    password:zod.string().regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])[A-z\d!@#$%^&]{8,20}/)
})

export const inputValid = function (req:Request, res:Response, next:NextFunction) {
    const userBody = req.body;
    const valid = userSchema.safeParse(userBody);

    //console.log(userBody , "from inputvalid function")

    if(valid.success) {
        
        next();
        return;
    }
    
    res.status(411).json({
        message:"please provide good inputs"
    })
    

}