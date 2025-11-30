import mongoose from "mongoose";

export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("DB Connected");

    }catch(error){
        console.log("Error While Connecting DB",error);
        process.exit(1);
    }
}; 