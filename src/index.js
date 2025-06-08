import mongoose from "mongoose";

import express from "express";
const app = express();
import connectDB from "./db/index.js";

//const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
    app.listen(process.env.port || 8000 , () => {
        console.log(`Server is running at port ${process.env.PORT || 8000 }`)
    })
})
.catch((err)=>{
    console.log(`MONGODB connection Failed ${err}`);
})










//Approach 1: Using async/await with try/catch

// //Optimized approach to connect to MongoDB using IIFE
// //Semicolon is necessary to avoid issues with minification or concatenation(cleaning purpose)
// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.error("Error connecting to MongoDB: ", error);
//             throw error;
//         });
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("Error  connecting to MongoDb : ", error);
//         throw error;
//     }
// })();  



// //Correct approach to connect to MongoDB
// // function connectToDatabase() {}
// // connectToDatabase()