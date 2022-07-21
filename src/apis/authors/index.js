import express from 'express'
import uniqid from 'uniqid'
import { readAuthors, writeAuthors } from '../../lib/utilities.js'

const authorsRouter = express.Router()


/********************************************************************************************/

authorsRouter.post("/", async (req,res) => {

    const authorsArray = await readAuthors()

    const newAuthor = {...req.body, createdAt: new Date(), id: uniqid()}

    if(authorsArray.find(author => author.email === req.body.email) === undefined){

    authorsArray.push(newAuthor)

    await writeAuthors(authorsArray)

    res.status(201).send({id: newAuthor.id})

    } else {
        res.status(400).send("author with this email already exists")
    }

})
/********************************************************************************************/

authorsRouter.get("/", async (req,res) => {

    const authorsArray = await readAuthors()

    

    res.send(authorsArray)
})

/********************************************************************************************/

authorsRouter.get("/:id", async (req,res) => {

    const authorsArray = await readAuthors()
 

    const reqAuthor = authorsArray.find((author) => 
        author.id === req.params.id
    )

    res.send(reqAuthor)
    
})

/********************************************************************************************/

authorsRouter.put("/:id", async (req,res) => {

    const authorsArray = await readAuthors()

    const index = authorsArray.findIndex((author) => author.id === req.params.id )

    const authorToPut = authorsArray[index]
    console.log(index)

    const authorUpdated = {...authorToPut,...req.body, updatedAt: new Date()}
    

    authorsArray[index] = authorUpdated

    await writeAuthors(authorsArray)


    

    res.send(authorUpdated)
    
})

/********************************************************************************************/

authorsRouter.delete("/:id", async  (req,res) => {

    const authorsArray = await readAuthors()
     

    const newAuthorsArray = authorsArray.filter( author=> author.id !== req.params.id)

    await writeAuthors(newAuthorsArray)

   

    res.status(204).send()



} )




export default authorsRouter