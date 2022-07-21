import express from "express"
import multer from "multer"
import { extname, join } from "path"
import {saveAuthorsAvatar,readAuthors, writeAuthors,readBlogPosts,writeBlogPosts,saveBlogPostCover} from "../../lib/utilities.js"

const filesRouter = express.Router()



filesRouter.post("/avatar/:id", multer({ limits: { fileSize: 1024 * 1024 } }).single("avatar"), async (req, res, next) => {
    
    try {
      console.log("FILE: ", req.file)

     const posts = await readAuthors()

     const index = posts.findIndex(author => author.id === req.params.id)

     const fileName = req.params.id + extname(req.file.originalname)

     if(index !== -1){
     const currentAuthor = posts[index] 

     

     const updatedAuthor = {...currentAuthor,avatar: `http://localhost:3001/img/authors/${fileName}`}
      
      posts[index] = updatedAuthor

      await writeAuthors(posts)
     }

     

      await saveAuthorsAvatar(fileName, req.file.buffer)
      res.send("UPLOADED")
    } catch (error) {
      next(error)
    }
  })

  filesRouter.post("/cover/:id", multer({ limits: { fileSize: 1024 * 1024 } }).single("cover"), async (req, res, next) => {
    
    try {
      console.log("FILE: ", req.file)

     const posts = await readBlogPosts()

     const index = posts.findIndex(post => post.blogPost_id === req.params.id)

     const fileName = req.params.id + extname(req.file.originalname)

     if(index !== -1){
     const currentBlogPost = posts[index] 

     

     const updatedBlogPost = {...currentBlogPost,cover: `http://localhost:3001/img/blogPosts/${fileName}`}
      
      posts[index] = updatedBlogPost

      await writeBlogPosts(posts)
     }

     

      await saveBlogPostCover(fileName, req.file.buffer)
      res.send("UPLOADED")
    } catch (error) {
      next(error)
    }
  })

  export default filesRouter