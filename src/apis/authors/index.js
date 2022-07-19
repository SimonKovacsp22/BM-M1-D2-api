import express from 'express'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from 'uniqid'

const authorsRouter = express.Router()

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)),"authors.json")

const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

/********************************************************************************************/

authorsRouter.post("/",(req,res) => {

    const newAuthor = {...req.body, createdAt: new Date(), id: uniqid()}

    if(authorsArray.find(author => author.email === req.body.email) === undefined){

    authorsArray.push(newAuthor)

    fs.writeFileSync(authorsJSONPath,JSON.stringify(authorsArray))

    res.status(201).send({id: newAuthor.id})

    } else {
        res.status(400).send("author with this email already exists")
    }

})
/********************************************************************************************/

authorsRouter.get("/",(req,res) => {

    

    res.send(authorsArray)
})

/********************************************************************************************/

authorsRouter.get("/:id",(req,res) => {
 

    const reqAuthor = authorsArray.find((author) => 
        author.id === req.params.id
    )

    res.send(reqAuthor)
    
})

/********************************************************************************************/

authorsRouter.put("/:id",(req,res) => {


    const index = authorsArray.findIndex((author) => author.id === req.params.id )

    const authorToPut = authorsArray[index]
    console.log(index)

    const authorUpdated = {...authorToPut,...req.body, updatedAt: new Date()}
    

    authorsArray[index] = authorUpdated
    console.log(authorsArray)

    fs.writeFileSync(authorsJSONPath,JSON.stringify(authorsArray))

    res.send(authorUpdated)
    
})

/********************************************************************************************/

authorsRouter.delete("/:id", (req,res) => {
     

    const newAuthorsArray = authorsArray.filter( author=> author.id !== req.params.id)

    fs.writeFileSync(authorsJSONPath,JSON.stringify(newAuthorsArray))

    res.status(204).send()



} )




export default authorsRouter