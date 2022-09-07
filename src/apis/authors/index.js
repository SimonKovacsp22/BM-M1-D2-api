import AuthorsModel from './authorsModel.js'
import createHttpError from 'http-errors'

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

