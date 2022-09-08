
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import authorsRouter from './apis/authors/routes.js';
import blogRouter from './apis/blogPosts/index.js';
import filesRouter from './apis/files/index.js';
import mongoose from 'mongoose';
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericServerErrorHandler, forbiddenErrorHandler } from './apis/errorHandlers.js';
import googleStrategy from './lib/google.js';
import passport from 'passport';







const server = express()

const port = process.env.PORT || 3001


passport.use("google", googleStrategy)


server.use(cors())
server.use(express.json())

server.use(passport.initialize())

server.use("/authors", authorsRouter)
server.use("/blogPosts",blogRouter)
server.use("/files",filesRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(forbiddenErrorHandler)
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


