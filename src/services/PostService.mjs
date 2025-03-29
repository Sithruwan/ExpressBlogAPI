// services/PostService.mjs
import userRepo from "../repos/User.repo.mjs";
import postRepository from '../repos/Post.repo.mjs';
import PostReqDTO from '../DTOs/req/PostReq.dto.mjs';
import { sequelize } from '../configs/DB/db.mjs';
import PostUpdateReqDTO from "../DTOs/req/PostUpdateReq.dto.mjs";
import { socketService } from "../../app.mjs";
import AppError from "../utills/errorHandlers/AppError.mjs";

class PostService {
    postRepository;
    userRepo;
    constructor(postRepository, userRepo) {
        this.postRepository = postRepository;
        this.userRepo = userRepo;
    }

    // Create a new post (authenticated users only)
    createPost = async (postData, next) => {
        const transaction = await sequelize.transaction();
        try {
           
            const postReqDto = PostReqDTO.toDto(postData);

            //  user exists
            const user = await this.userRepo.findById(postReqDto.userId);
            if (!user) {
                return next(new AppError('User not found', 404, 'PostController-createPost'));
            }

            // Create the post
            const newPost = await postRepository.create(postReqDto, transaction);

            // Commit the transaction
            await transaction.commit();

            // Broadcast the post creation
            socketService.broadcastPostCreated(newPost);
            return newPost;
        } catch (error) {
            await transaction.rollback();
            return next(new AppError('Post creation failed', 400, 'PostController-createPost'));
        }
    };

    // Get all posts (optionally filtered by userId)
    getAllPosts = async (userId = null) => {
        try {
            return await postRepository.getAll(userId);
        } catch (error) {
            return next(new AppError('Post retrieval failed', 400, 'PostController-getAllPosts'));
        }
    };

    // Get a post by ID
    getPostById = async (id, next) => {
        try {
            const post = await postRepository.getById(id);
            if (!post) {
                return next(new AppError('Post not found', 404, 'PostController-getPostById'));
            }
            return post;
        } catch (error) {
            return next(new AppError('Post retrieval failed', 400, 'PostController-getPostById'));
        }
    };

    // Update post (authenticated user and post owner only)
    updatePost = async (id, postData, userId, next) => {
        const transaction = await sequelize.transaction();
        try {
            const post = await postRepository.getById(id);
            if (!post) {
                return next(new AppError('Post not found', 404, 'PostController-updatePost'));
            }

            
            if (post.userId !== userId) {
                return next(new AppError('You can only update your own posts', 403, 'PostController-updatePost'));
            }

            const postDto = PostUpdateReqDTO.toDto({ ...postData, userId, id });
            const updatedPost = await postRepository.updateById(id, postDto, transaction);

         
            await transaction.commit();

          
            socketService.broadcastPostUpdated(updatedPost);
            return updatedPost;
        } catch (error) {
            await transaction.rollback();
            return next(new AppError('Post update failed', 400, 'PostController-updatePost'));
        }
    };

    // Delete post (authenticated user and post owner only)
    deletePost = async (id, userId, next) => {
        const transaction = await sequelize.transaction();
        try {
            const post = await postRepository.getById(id);
            if (!post) {
                return next(new AppError('Post not found', 404, 'PostController-deletePost'));
            }

            
            if (post.userId !== userId) {
                return next(new AppError('You can only delete your own posts', 403, 'PostController-deletePost'));
            }

            await postRepository.deleteById(id, transaction);

           
            await transaction.commit();

            
            socketService.broadcastPostDeleted(id);
            return { message: 'Post deleted successfully' };
        } catch (error) {
            await transaction.rollback();
            return next(new AppError('Post deletion failed', 400, 'PostController-deletePost'));
        }
    };
}

export default new PostService(postRepository, userRepo);
