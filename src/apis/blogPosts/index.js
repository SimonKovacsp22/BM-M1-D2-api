import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { checkBlogPostSchema, checkValidationResult } from './validation.js'
import createHttpError from "http-errors"
import uniqid from 'uniqid'
import fs from 'fs'

const blogRouter = express.Router()

const blogPostsJSONPath = join(dirname(fileURLToPath(import.meta.url)),"blogPosts.json")

const writeBlogPosts = (array) => fs.writeFileSync(blogPostsJSONPath,JSON.stringify(array))

const blogPostsArray = JSON.parse(fs.readFileSync(blogPostsJSONPath))

const postABlogPost = (req,res,next) => {

    try{

    const newBlogPost = {...req.body, blogPost_id: uniqid(), createdAt:new Date()}
    
    blogPostsArray.push(newBlogPost)

    writeBlogPosts(blogPostsArray)

    

    res.status(201).send({id: newBlogPost.blogPost_id})
    } catch(error) {
        next(error)
    }
}

 const getAllBlogPosts = (req,res,next) => {
  try {

    if(req.query && req.query.category){
         const blogsInCategory = blogPostsArray.filter( post => post.category === req.query.category)
         
         res.send(blogsInCategory)


    } else {
        res.send(blogPostsArray)
    }

    

  } catch (error) {
    next(error)
  }
}

 const getABlogPost = (req,res,next) => {
  try{

    const blogPostFound = blogPostsArray.find( post => post.blogPost_id === req.params.blogPost_id)
   
    if(blogPostFound) {
        res.send(blogPostFound)
    } else {
         next(createHttpError(404,`book with id ${req.params.blogPost_id} was not found!`))
    }

  } catch(error){
    next(error)
  }
}

 const putABlogPost = (req,res,next) => {

    try{

        const blogPostToPutIndex = blogPostsArray.findIndex( post => post.blogPost_id === req.params.blogPost_id)
        
        if(blogPostToPutIndex !== -1) {
            
            const oldBlogPost = blogPostsArray[blogPostToPutIndex]

            const newBlogPost =   {...oldBlogPost, ...req.body}

            blogPostsArray[blogPostToPutIndex] = newBlogPost

            writeBlogPosts(blogPostsArray)

            res.send(newBlogPost)

        } else {

            next(createHttpError(404,`book with id ${req.params.blogPost_id} was not found!`))
            
        }
    } catch(error) {
        next(error)
    }

}

 const deleteABlogPost = (req,res,next) => {
  try {
       const remainingBlogPosts = blogPostsArray.filter( post => post.blogPost_id !== req.params.blogPost_id)

       writeBlogPosts(remainingBlogPosts)

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