import dotenv from "dotenv"

dotenv.config()

import mongoose from "mongoose";

const MONGOURI = process.env.MONGO_URI; 
export const connectDb = async () =>{
    try {
        if(!MONGOURI){
            throw new Error("MONGO_URI is not defined in .env")
        }
        await mongoose.connect(MONGOURI)
        console.log("Connection Successful");
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error("Mongodb connection Failed : ", message)
        process.exit(1)
    }
}