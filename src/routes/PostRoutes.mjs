import { Router } from "express";
import { jwtAuthverifyMiddleware } from "../middlewares/jwtAuthMiddleware.mjs";
import PostController from "../controllers/Post.controller.mjs";
import { createPostValidation, getPostByIdValidation, updatePostValidation } from "../middlewares/validations/PostValidations.mjs";

const postRoutes = Router();

//postRoutes.post('/', (req,res)=>{ res.send("Hello World posts"); });
postRoutes.post('/', jwtAuthverifyMiddleware,createPostValidation, PostController.createPost);
postRoutes.get('/', PostController.getAllPosts);  // Get all posts
postRoutes.get('/:id',getPostByIdValidation, PostController.getPostById);  // Get post by ID
postRoutes.put('/:id', jwtAuthverifyMiddleware,updatePostValidation, PostController.updatePost);  // Update post (authenticated)
postRoutes.delete('/:id', jwtAuthverifyMiddleware, PostController.deletePost);  // Delete post (authenticated)

export default postRoutes