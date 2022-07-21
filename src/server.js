import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import authorsRouter from './apis/authors/index.js';
import blogRouter from './apis/blogPosts/index.js';
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericServerErrorHandler } from './apis/errorHandlers.js';







const server = express()

const port = 3001


server.use(cors())
server.use(express.json())

server.use("/authors", authorsRouter)
server.use("/blogPosts",blogRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)


server.listen(port,() => {
    console.table(listEndpoints(server))
    console.log("Server is running on port:", port)
})