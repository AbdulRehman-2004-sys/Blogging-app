import mongoose from "mongoose";

export const ConnectDb = async()=>
{
    await mongoose.connect("mongodb://localhost:27017/blogs")
    console.log("MongoDb connected ✅");
}