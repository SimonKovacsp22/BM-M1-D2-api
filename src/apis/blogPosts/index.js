import express from 'express'
import { checkBlogPostSchema, checkValidationResult } from './validation.js'
import createHttpError from "http-errors"
import uniqid from 'uniqid'
import BlogPostsModel from './blogPostModel.js'
import { writeBlogPosts, readBlogPosts } from '../../lib/utilities.js'


const blogRouter = express.Router()



const postABlogPost = async (req,res,next) => {

    try{
      const newBlogPost = new BlogPostsModel(req.body)

      const {_id} = await newBlogPost.save()

    

    res.status(201).send({id: _id})
    } catch(error) {
        next(error)
    }
}

 const getAllBlogPosts = async (req,res,next) => {
  try {
    const posts = await BlogPostsModel.find()

    res.send(posts)

    } 
        catch (error) {
    next(error)
  }
}

 const getABlogPost = async (req,res,next) => {
  try{
    const post = await BlogPostsModel.findById(req.params.id)
    
    if(post) {
        res.send(post)
    } else {
         next(createHttpError(404,`blogPost with id ${req.params.id} was not found!`))
    }

  } catch(error){
    next(error)
  }
}

 const putABlogPost = async (req,res,next) => {

    try{
        const updatedPost = await BlogPostsModel.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        
        if(updatedPost){
          res.send(updatedPost)

        } else {

            next(createHttpError(404,`blogPost with id ${req.params.id} was not found!`))
        }
    } catch(error) {
        next(error)
    }

}

 const deleteABlogPost = async (req,res,next) => {
  try {
       const PostToDelete = await BlogPostsModel.findByIdAndDelete(req.params.id)

       if(PostToDelete){
        res.status(204).send()
       } else {
        next(createHttpError(404, `blogPost with id ${req.params.id} not found!`))
       }

  } catch(error) {
    next(error)
  }
}





blogRouter.post("/",postABlogPost)

blogRouter.get("/",getAllBlogPosts)

blogRouter.get("/:id",getABlogPost)

blogRouter.put("/:id",putABlogPost)

blogRouter.delete("/:id",deleteABlogPost)





export default blogRouter