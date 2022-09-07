import express from 'express'
import {createAuthor,getAuthors,getAuthorById,updateAuthor,deleteAuthor, getMe, updateMe, deleteMe, login} from './index.js'
import { JWTAuthMiddleware } from '../../lib/JWTAuthMiddleware.js'
import { adminOnlyMiddleware } from '../../lib/adminMiddleware.js'


const authorsRouter = express.Router()



authorsRouter.post("/register", createAuthor)
authorsRouter.post("/login", login)
authorsRouter.get("/me", JWTAuthMiddleware, getMe)
authorsRouter.put("/me", JWTAuthMiddleware, updateMe)
authorsRouter.delete("/me", JWTAuthMiddleware, deleteMe)
authorsRouter.get("/",JWTAuthMiddleware, getAuthors)
authorsRouter.get("/:id",JWTAuthMiddleware, getAuthorById)
authorsRouter.put("/:id",JWTAuthMiddleware, adminOnlyMiddleware, updateAuthor)
authorsRouter.delete("/:id",JWTAuthMiddleware, adminOnlyMiddleware, deleteAuthor)






export default authorsRouter