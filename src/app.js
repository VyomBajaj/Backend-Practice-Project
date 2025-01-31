import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

export const app = express();


app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

//routers import

import userRouter from "./routes/user.route.js"

//routes declaration

app.use("/api/v1/users",userRouter)
