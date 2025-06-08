import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =  async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected | DB Host :${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error("MongoDB Connection Failed : ", error);
        process.exit(1); // Exit the process with failure
    }
};  


export default connectDB;