import express from "express";

const app = express();

//body parsing - converting the bytes to json
app.use(express.json())



app.listen(3000, function () {
    console.log("app is running on the port 3000 at localhost")
})