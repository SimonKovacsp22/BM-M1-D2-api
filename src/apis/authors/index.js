import AuthorsModel from './authorsModel.js'
import createHttpError from 'http-errors'
import { createAccessToken } from '../../lib/tokenTools.js'


export const createAuthor= async (req,res,next)=>{

   try {

    const newAuthor = new AuthorsModel(req.body)

    const {_id} = await newAuthor.save()

    res.status(201).send({_id})

   } catch(error){

    next(error)
   }
}
export const getAuthors  = async (req,res,next) => {

    try {
        
        const authors = await AuthorsModel.find().populate("blogPosts")

        res.send(authors)

    } catch (error) {

        next(error)
    }

}
export const getAuthorById = async (req,res,next) => {
    try {
        
        const author = await AuthorsModel.findById(req.params.id)

        if(author){

            res.send(author)
        
        } else {

            createHttpError(404,`author with id: ${req.params.id} was not found`)}

        
    } catch (error) {
        next(error)
    }

}
export const updateAuthor = async (req,res,next) => {

    try{

    const updatedAuthor = await AuthorsModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

    if(updatedAuthor){

        res.send(updatedAuthor)
    
    }else {

        createHttpError(404,`author with id: ${req.params.id} was not found`)}

     } catch(error){

        next(error)
    }

}
export const deleteAuthor = async (req,res,next) => {

    try {

        const deleteAuthor = await AuthorsModel.findByIdAndDelete(req.params.id)

        if(deleteAuthor){

            res.status(204).send()
        
        } else {

         createHttpError(404,`author with id: ${req.params.id} was not found`)}
        
    } catch (error) {

        next(error)
        
    }

}

export const getMe = async (req,res,next) => {
    try {
        
        const me = await AuthorsModel.findById(req.user._id)

        if(me){

            res.send(me)
        
        } else {

            createHttpError(404,`author with id: ${req.user._id} was not found`)}

        
    } catch (error) {
        next(error)
    }

}

export const updateMe = async (req,res,next) => {
    try {
        
        const meUpdated = await AuthorsModel.findByIdAndUpdate(req.user._id,req.body,{new:true, runValidators:true})

        if(meUpdated){

            res.send(meUpdated)
        
        } else {

            createHttpError(404,`author with id: ${req.params.id} was not found`)}

        
    } catch (error) {
        next(error)
    }

}

export const deleteMe = async (req,res,next) => {
    try {
        
        await AuthorsModel.findByIdAndDelete(req.user._id)

            res.status(204).send("deleted user")
        
    } catch (error) {
        next(error)
    }

}

export const login = async (req,res,next) => {
    try {

        const{email,password} = req.body

        const user = await AuthorsModel.checkCredentials(email,password)

        if(user) {
            const token = await createAccessToken({_id: user._id, role: user.role})
            res.send({accessToken: token})
        } else {

            next(createHttpError(401, "Your credentials are wrong!"))
        }
        
    } catch (error) {
        console.log(error)
    }
}

