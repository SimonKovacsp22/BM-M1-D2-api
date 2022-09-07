import mongoose from "mongoose";

const {model,Schema} = mongoose

const authorSchema = new Schema({
    name:{type:String, required:true},
    surname:{type:String, required:true},
    dateOfBirth:{type:Date, required:true},
    avatar:{type:String},
    blogPosts:[{type:mongoose.Types.ObjectId,ref:"BlogPost"}]
},
{timestamps: true},
)

export default model("Author",authorSchema)