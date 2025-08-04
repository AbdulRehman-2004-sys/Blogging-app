import mongoose from "mongoose";

const subsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})


export const subsModel = mongoose.models.subsModel || mongoose.model("subsModel",subsSchema)