import { Router } from "express";
import { jwtAuthverifyMiddleware } from "../middlewares/jwtAuthMiddleware.mjs";
import PostController from "../controllers/Post.controller.mjs";

const postRoutes = Router();

//postRoutes.post('/', (req,res)=>{ res.send("Hello World posts"); });
postRoutes.post('/', jwtAuthverifyMiddleware, PostController.createPost);
postRoutes.get('/', PostController.getAllPosts);  // Get all posts
postRoutes.get('/:id', PostController.getPostById);  // Get post by ID
postRoutes.put('/:id', jwtAuthverifyMiddleware, PostController.updatePost);  // Update post (authenticated)
postRoutes.delete('/:id', jwtAuthverifyMiddleware, PostController.deletePost);  // Delete post (authenticated)

export default postRoutes