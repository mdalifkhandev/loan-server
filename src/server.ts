import mongoose from "mongoose";
import app from "./app";
import 'dotenv/config';

const port=process.env.PORT || 5001


const dataBaseConnection=async()=>{
    try{
        await mongoose.connect(process.env.DB as string)

        app.listen(port,()=>{
            console.log(`Servier is running Port : ${port}`);
        })
        console.log(`🟢  MongoDB Connecting Successfully ✅`);
        
    }catch(err){
        console.log("🔴 Mongodb Connection Error  ❌",err);
        
    }
}

dataBaseConnection()

