import express from 'express'
import createHttpError from "http-errors"
import BlogPostsModel from './blogPostModel.js'
import AuthorsModel from '../authors/authorsModel.js'
import {createComment,getCommentsForSinglePost,getCommentById,editComment,deleteComment} from "../comments/index.js"



const blogRouter = express.Router()



const postABlogPost = async (req,res,next) => {

    try{
      const newBlogPost = new BlogPostsModel(req.body)

      const author = await AuthorsModel.findById(req.params.author_id)

      if(!author){
       return next(createHttpError(404,`author with id: ${req.params.author_id} was not foud`))
      }

      const {_id} = await newBlogPost.save()

      await AuthorsModel.findByIdAndUpdate(req.params.author_id,{$push:{blogPosts:_id}},{new: true, runValidators:true})

    

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





blogRouter.post("/:author_id",postABlogPost)

blogRouter.get("/",getAllBlogPosts)

blogRouter.get("/:id",getABlogPost)

blogRouter.put("/:id",putABlogPost)

blogRouter.delete("/:id",deleteABlogPost)

blogRouter.post("/:blogPost_id/comments",createComment)

blogRouter.get("/:blogPost_id/comments",getCommentsForSinglePost)

blogRouter.get("/:blogPost_id/comments/:id",getCommentById)

blogRouter.put("/:blogPost_id/comments/:id",editComment)

blogRouter.delete("/:blogPost_id/comments/:id",deleteComment)





export default blogRouter