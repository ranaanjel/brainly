import dotenv from "dotenv";
dotenv.config()

import express, { NextFunction, Request, Response,ErrorRequestHandler } from "express";
import cors from "cors"
import { userRouter } from "./routes/userRoutes";

const app = express();

app.use(cors())
//body parsing - converting the bytes to json
app.use(express.json())

//route handling middleware
app.use("/user",userRouter)


//handing the get request in case of no value above is found - order matters
app.get("*", function (req:Request, res:Response) {
    res.status(404).send("<h1>Value not found</h1>")
})

//global error catch middleware
const errorHandling : ErrorRequestHandler = function (err, req:Request, res:Response, next:NextFunction) {
    console.log(err)
    res.status(500).json({
        error:"error occured in the server"
    })
};
app.use(errorHandling)


//running the app
app.listen(3000, function () {
    console.log("app is running on the port 3000 at localhost")
})