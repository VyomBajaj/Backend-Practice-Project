import connectDB from "./db/index.js";
import express from 'express';
import dotenv from 'dotenv';
import { app } from "./app.js";

dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server started at Port ${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log("App crashed DB not connected")
})
