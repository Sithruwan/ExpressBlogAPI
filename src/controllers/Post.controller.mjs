import postService from "../services/PostService.mjs";
import PostReqDTO from '../DTOs/req/PostReq.dto.mjs';
import PostResDTO from "../DTOs/res/PostRes.dto.mjs";
import PostUpdateReqDTO from "../DTOs/req/PostUpdateReq.dto.mjs";
import AppError from "../utills/errorHandlers/AppError.mjs";
class PostController {
    postService;
    constructor(postService) {
        this.postService = postService;
    }
    // Create a new post (authenticated users only)
    createPost = async (req, res,next) => {
        try {
            if (!req.user) {
                // Assumed that req.user contains authenticated user information
                
                throw new Error('User not authenticated');
            }
            const postData = PostReqDTO.toDto({ ...req.body, userId: req.user.id });
           


            const post = await postService.createPost(postData,next);
            return res.status(201).json({
                status: 'success',
                message: 'Post created successfully',
                data: post,
            });
        } catch (error) {
            //console.error('Error creating post:', error);
           return next(new AppError(error.message, 400, 'PostController-createPost')); 
            //throw new AppError(error.message, 400, 'PostController-createPost');
        }
    };

    // Get all posts (optionally filtered by userId)
    getAllPosts = async (req, res,next) => {
        try {
            const userId = req.query.userId || null;
            const data = await postService.getAllPosts(userId,next);
            const posts = data.map((post) => PostResDTO.toDto(post));
            return res.status(200).json({
                status: 'success',
                data: posts,
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
            returnnext(new AppError(error.message, 400, 'PostController-getAllPosts'));    
        }
    };

    // Get post by ID
    getPostById = async (req, res,next) => {
        try {
            const postId = req.params.id;
            const post = await postService.getPostById(postId,next);
            return res.status(200).json({
                status: 'success',
                data: post,
            });
        } catch (error) {
            console.error('Error fetching post:', error);
            return next(new AppError(error.message, 400, 'PostController-getPostById'));
        }
    };

    // Update post (authenticated user and post owner only)
    updatePost = async (req, res,next) => {
        try {
            const postId = req.params.id;
            const postUpdateData = PostUpdateReqDTO.toDto({ ...req.body, userId: req.user.id, id: postId });	
            const postData = {
                tittle: postUpdateData.tittle,
                content: postUpdateData.content
            }; 
            const updatedPost = await postService.updatePost(postUpdateData.id ,postData, postUpdateData.userId,next);
            return res.status(200).json({
                status: 'success',
                message: 'Post updated successfully',
                data: updatedPost,
            });
        } catch (error) {
            console.error('Error updating post:', error);
            return next(new AppError(error.message, 400, 'PostController-updatePost'));
            
        }
    };

    // Delete post (authenticated user and post owner only)
    deletePost = async (req, res,next) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;  // Assumed authenticated user
            const result = await postService.deletePost(postId, userId,next);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting post:', error);
            return next(new AppError(error.message, 400, 'PostController-deletePost'));
        }
    };
}

export default new PostController(postService);