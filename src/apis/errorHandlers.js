import mongoose from 'mongoose'

export const badRequestHandler = (err, req, res, next) => {
    if (err.status === 400 || err instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: err.message, errorsList: err.errorsList })
    } else if( err instanceof mongoose.Error.CastError){
      console.log(err)
      res.status(400).send({ message:"Wrong id!"})
    } else {
      next(err)
    }
  }
  
  export const unauthorizedHandler = (err, req, res, next) => {
    if (err.status === 401) {
      res.status(401).send({ message: err.message })
    } else {
      next(err)
    }
  }

  export const forbiddenErrorHandler = (err, req, res, next) => {
    if (err.status === 403) {
      res.status(403).send({ success: false, message: err.message })
    } else {
      next(err)
    }
  }
  
  export const notFoundHandler = (err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).send({ success: false, message: err.message })
    } else {
      next(err)
    }
  }
  
  export const genericServerErrorHandler = (err, req, res, next) => {
    console.log("ERR: ", err)
    res.status(500).send({ message: "An error occurred on our side! We are gonna fix this ASAP!" })
  }