import express from 'express'
import { checkBlogPostSchema, checkValidationResult } from './validation.js'
import createHttpError from "http-errors"
import uniqid from 'uniqid'
import { writeBlogPosts, readBlogPosts } from '../../lib/utilities.js'


const blogRouter = express.Router()



const postABlogPost = async (req,res,next) => {

    try{

    const newBlogPost = {...req.body, blogPost_id: uniqid(), createdAt:new Date()}

    const posts = await readBlogPosts ()
    
    posts.push(newBlogPost)

    await writeBlogPosts(posts)

    

    res.status(201).send({id: newBlogPost.blogPost_id})
    } catch(error) {
        next(error)
    }
}

 const getAllBlogPosts = async (req,res,next) => {
  try {
    const posts = await readBlogPosts()

    if(req.query && req.query.category){

         

         const blogsInCategory = posts.filter( post => post.category === req.query.category)
         
         res.send(blogsInCategory)


    } else {
        res.send(posts)
    }
} catch (error) {
    next(error)
  }
}

 const getABlogPost = async (req,res,next) => {
  try{
    const posts = await readBlogPosts()
    const blogPostFound = posts.find( post => post.blogPost_id === req.params.blogPost_id)
   
    if(blogPostFound) {
        res.send(blogPostFound)
    } else {
         next(createHttpError(404,`blogPost with id ${req.params.blogPost_id} was not found!`))
    }

  } catch(error){
    next(error)
  }
}

 const putABlogPost = async (req,res,next) => {

    try{


        const posts = await readBlogPosts()
        const blogPostToPutIndex = posts.findIndex( post => post.blogPost_id === req.params.blogPost_id)
        
        if(blogPostToPutIndex !== -1) {
            
            const oldBlogPost = posts[blogPostToPutIndex]

            const newBlogPost =   {...oldBlogPost, ...req.body}

            posts[blogPostToPutIndex] = newBlogPost

            await writeBlogPosts(posts)

            res.send(newBlogPost)

        } else {

            next(createHttpError(404,`blogPost with id ${req.params.blogPost_id} was not found!`))
            
        }
    } catch(error) {
        next(error)
    }

}

 const deleteABlogPost = async (req,res,next) => {
  try {
       const posts = await readBlogPosts()

       const remainingBlogPosts = posts.filter( post => post.blogPost_id !== req.params.blogPost_id)

       await writeBlogPosts(remainingBlogPosts)

       res.status(204).send()

  } catch(error) {
    next(error)
  }
}





blogRouter.post("/",checkBlogPostSchema,checkValidationResult,postABlogPost)

blogRouter.get("/",getAllBlogPosts)

blogRouter.get("/:blogPost_id",getABlogPost)

blogRouter.put("/:blogPost_id",putABlogPost)

blogRouter.delete("/:blogPost_id",deleteABlogPost)





export default blogRouter