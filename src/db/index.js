import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

async function connectDB(){
    try {
        const resp = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected DB Host:${resp.connection.host}`)
    } catch (error) {
        console.log("Error connecting database",error);
    }
}

export default connectDB