import express from "express"
import multer from "multer"



const filesRouter = express.Router()



filesRouter.post("/avatar/:id", multer({ limits: { fileSize: 1024 * 1024 } }).single("avatar"), async (req, res, next) => {
    
    try {
     

      
     }

     

     
     catch (error) {
      next(error)
    }
  })

  filesRouter.post("/cover/:id", multer({ limits: { fileSize: 1024 * 1024 } }).single("cover"), async (req, res, next) => {
    
    try {
      
    }

     

      
      
     catch (error) {
      next(error)
    }})


  export default filesRouter