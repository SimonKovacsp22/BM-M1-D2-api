import mongoose from "mongoose";

const {model, Schema} = mongoose

const commentSchema = new Schema({
    author_id:{type:String, required: true},
    text:{type:String, required: true},
    likes:{type:Number}

})

export default model("Comment",commentSchema)