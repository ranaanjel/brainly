"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
//mongoose connection
const mongoose_1 = __importDefault(require("mongoose"));
let databaseURL = process.env.DATABASE_URL;
mongoose_1.default.connect(databaseURL + "brainly").then(function () {
    console.log("connected to database");
});
app.use((0, cors_1.default)());
//body parsing - converting the bytes to json
app.use(express_1.default.json());
//route handling middleware
app.use("/user", userRoutes_1.userRouter);
//handing the get request in case of no value above is found - order matters
app.get("*", function (req, res) {
    res.status(404).send("<h1>Value not found</h1>");
});
//global error catch middleware
const errorHandling = function (err, req, res, next) {
    console.log(err);
    res.status(500).json({
        error: "error occured in the server"
    });
};
app.use(errorHandling);
//running the app
app.listen(3000, function () {
    console.log("app is running on the port 3000 at localhost");
});
