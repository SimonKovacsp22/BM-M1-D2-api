import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import {join} from 'path'
import authorsRouter from './apis/authors/index.js';
import blogRouter from './apis/blogPosts/index.js';
import filesRouter from './apis/files/index.js';
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericServerErrorHandler } from './apis/errorHandlers.js';








const server = express()

const port = 3001
const publicFolderPath = join(process.cwd(), "./public")

server.use(express.static(publicFolderPath))
server.use(cors())
server.use(express.json())

server.use("/authors", authorsRouter)
server.use("/blogPosts",blogRouter)
server.use("/files",filesRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)


server.listen(port,() => {
    console.table(listEndpoints(server))
    console.log("Server is running on port:", port)
})