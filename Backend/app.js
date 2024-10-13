import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from  "./routes/userRouter.js"
import blogRouter from "./routes/blogRouter.js"
import fileUpload from "express-fileupload";


const app = express();
dotenv.config({path:"./config/config.env"});

// use is used to use middleware and cors is used to enable cross origin resource sharing
app.use(cors({
    origin:["https://yatharth-gyan-frontend.onrender.com"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))


// when user register then cookie parser generates a cookie to identify the user
app.use(cookieParser());
// json is used to parse json data or incoming request with jason payload and is based on body parser
app.use(express.json());
// jo data aayega wo kis form me aayega string or array or file.
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

dbConnection();

// Jab bhi error k middleware ko import karayenge toh usko ekdum last mein use karenge but export karne se pehle.
app.use(errorMiddleware);
export default app;
