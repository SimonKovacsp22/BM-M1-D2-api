import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const blogPostSchema = {
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title is a mandatory field and needs to be a string!",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category is a mandatory field and needs to be a string!",
    },
  },
  'author.name':{

    isEmail: {
      errorMessage: "Email must be a valid email address!",
    },
  
  in: ["body"],
}
}


export const checkBlogPostSchema = checkSchema(blogPostSchema) 

export const checkValidationResult = (req, res, next) => {
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    
    next(createHttpError(400, "Validation errors in request body!", { errorsList: errors.array() }))
  } else {
    
    next()
  }
}