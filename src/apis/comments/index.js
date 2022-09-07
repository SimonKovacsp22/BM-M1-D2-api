import CommentsModel from "./commentModel.js";
import blogPostModel from "../blogPosts/blogPostModel.js";
import createHttpError from "http-errors";

export const createComment = async (req, res, next) => {
  try {
    const comment = new CommentsModel(req.body)

    await comment.save()

    const blogPostToUpdate = await blogPostModel.findByIdAndUpdate(req.params.blogPost_id,
         { $push: { comments: comment } },
         {new:true, runValidators: true})

         if(blogPostToUpdate){
            res.send(blogPostToUpdate)
        } else {
          next(createHttpError(404, `BlogPost with id ${req.params.blogPost_id} not found!`))
        }

  } catch (error) {
    next(error);
  }
};

export const getCommentsForSinglePost = async (req, res, next) => {
  try {

     const postToGetCommentsFrom = await blogPostModel.findById(req.params.blogPost_id)

     if(postToGetCommentsFrom){
        res.send(postToGetCommentsFrom.comments)
    }else{
            next(createHttpError(404,`blogPost with id:${req.params.blogPost_id} was not found`))
        }
     }
   catch (error) {
    next(error);
  }
};
export const getCommentById = async (req, res, next) => {
  try {

    const postToGetCommentFrom = await blogPostModel.findById(req.params.blogPost_id)  
    if(postToGetCommentFrom)  {
        const commentToFind = postToGetCommentFrom.comments.find( comment => comment._id.toString() === req.params.id)

        if(commentToFind){
            res.send(commentToFind)
        } else {
            next(createHttpError(404, `commnet with id: ${req.params.id} was not found`))
        }

    } else {
        next(createHttpError(404, `blogPost with id: ${req.params.blogPost_id} was not found`))
    }
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
      const blogPostToEditCommentIn = await blogPostModel.findById(req.params.blogPost_id)

      if(blogPostToEditCommentIn) {

        const index = blogPostToEditCommentIn.comments.findIndex( comment => comment._id.toString() === req.params.id)

        if(index !== -1) {

            blogPostToEditCommentIn.comments[index] = {...blogPostToEditCommentIn.comments[index].toObject(), ...req.body}

            await blogPostToEditCommentIn.save()

            res.send(blogPostToEditCommentIn)
        } else {
            next(createHttpError(404, `comment with id: ${req.params.id} was not found`))
        }
      } else {
        next(createHttpError(404, `blogPost with id: ${req.params.blogPost_id} was not found`))
      }

  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {

    const blogPostToDeleteCommentIn = await blogPostModel.findByIdAndUpdate(req.params.blogPost_id,
        { $pull: { comments: { _id: req.params.id } } },
        { new: true, runValidators: true })

        if(blogPostToDeleteCommentIn){
            res.send(blogPostToDeleteCommentIn)
        } else {
            next(createHttpError(404, `wrong id, either for a post or for a comment`))
        }
  } catch (error) {
    next(error);
  }
};
