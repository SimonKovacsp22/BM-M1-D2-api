import express from 'express'
import {createAuthor,getAuthors,getAuthorById,updateAuthor,deleteAuthor} from './index.js'


const authorsRouter = express.Router()



authorsRouter.post("/", createAuthor)
authorsRouter.get("/", getAuthors)
authorsRouter.get("/:id", getAuthorById)
authorsRouter.put("/:id", updateAuthor)
authorsRouter.delete("/:id", deleteAuthor)




export default authorsRouter