import postService from "../services/PostService.mjs";
import PostReqDTO from '../DTOs/req/PostReq.dto.mjs';
import PostResDTO from "../DTOs/res/PostRes.dto.mjs";
import PostUpdateReqDTO from "../DTOs/req/PostUpdateReq.dto.mjs";
class PostController {
    postService;
    constructor(postService) {
        this.postService = postService;
    }
    // Create a new post (authenticated users only)
    createPost = async (req, res) => {
        try {
            const postData = PostReqDTO.toDto({ ...req.body, userId: req.user.id });
           // Assumed that req.user contains authenticated user information
            if (!req.user) {
                throw new Error('User not authenticated');
            }
           


            const post = await postService.createPost(postData);
            return res.status(201).json({
                status: 'success',
                message: 'Post created successfully',
                data: post,
            });
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(400).json({ error: error.message });
        }
    };

    // Get all posts (optionally filtered by userId)
    getAllPosts = async (req, res) => {
        try {
            const userId = req.query.userId || null;
            const data = await postService.getAllPosts(userId);
            const posts = data.map((post) => PostResDTO.toDto(post));
            return res.status(200).json({
                status: 'success',
                data: posts,
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
            return res.status(400).json({ error: error.message });
        }
    };

    // Get post by ID
    getPostById = async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await postService.getPostById(postId);
            return res.status(200).json({
                status: 'success',
                data: post,
            });
        } catch (error) {
            console.error('Error fetching post:', error);
            return res.status(400).json({ error: error.message });
        }
    };

    // Update post (authenticated user and post owner only)
    updatePost = async (req, res) => {
        try {
            const postId = req.params.id;
            const postUpdateData = PostUpdateReqDTO.toDto({ ...req.body, userId: req.user.id, id: postId });	
            const postData = {
                tittle: postUpdateData.tittle,
                content: postUpdateData.content
            }; 
            const updatedPost = await postService.updatePost(postUpdateData.id ,postData, postUpdateData.userId);
            return res.status(200).json({
                status: 'success',
                message: 'Post updated successfully',
                data: updatedPost,
            });
        } catch (error) {
            console.error('Error updating post:', error);
            return res.status(400).json({ error: error.message });
        }
    };

    // Delete post (authenticated user and post owner only)
    deletePost = async (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.user.id;  // Assumed authenticated user
            const result = await postService.deletePost(postId, userId);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting post:', error);
            return res.status(400).json({ error: error.message });
        }
    };
}

export default new PostController(postService);