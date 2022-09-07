
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import authorsRouter from './apis/authors/routes.js';
import blogRouter from './apis/blogPosts/index.js';
import filesRouter from './apis/files/index.js';
import mongoose from 'mongoose';
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericServerErrorHandler } from './apis/errorHandlers.js';








const server = express()

const port = process.env.PORT





server.use(cors())
server.use(express.json())

server.use("/authors", authorsRouter)
server.use("/blogPosts",blogRouter)
server.use("/files",filesRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)

mongoose.connect(process.env.MONGO_CON_URL)



mongoose.connection.on("connected",() =>{
    console.log("success")
    server.listen(port,() => {
        console.table(listEndpoints(server))
        console.log("Server is running on port:", port)
    })
    
})


