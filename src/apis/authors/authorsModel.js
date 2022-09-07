import mongoose from "mongoose";
import bcrypt from "bcrypt"

const {model,Schema} = mongoose

const authorSchema = new Schema({
    name:{type:String, },
    surname:{type:String, },
    email:{type:String, required:true},
    password:{type:String, required:true},
    dateOfBirth:{type:Date, required:true},
    avatar:{type:String},
    role:{type:String, enum:["User","Admin"],default:"User"},
    blogPosts:[{type:mongoose.Types.ObjectId,ref:"BlogPost"}]
},
{timestamps: true},
)



authorSchema.pre("save", async function(next){

    const currentAuthor = this

    const plainPW = currentAuthor.password

    if(currentAuthor.isModified("password")){

        const hash = await bcrypt.hash(plainPW, 10)

        currentAuthor.password = hash
    }

    next()
})

authorSchema.methods.toJSON = function () {

    const authorDocument = this
    const author = authorDocument.toObject()

    delete author.password
    delete author.__v
    return author
}

authorSchema.static("checkCredentials", async function (email, plainPW){

    const author = await this.findOne({email})

    if(author) {

        const isMatch = await bcrypt.compare(plainPW, author.password)

        if(isMatch) {
            return author
        } else {
            return null
        }
    } else {
        return null
    }
}) 

export default model("Author",authorSchema)