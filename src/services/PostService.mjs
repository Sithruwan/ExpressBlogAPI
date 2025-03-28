// services/PostService.mjs
import userRepo from "../repos/User.repo.mjs";
import postRepository from '../repos/Post.repo.mjs';
import PostReqDTO from '../DTOs/req/PostReq.dto.mjs';
import { sequelize } from '../configs/DB/db.mjs';
import PostUpdateReqDTO from "../DTOs/req/PostUpdateReq.dto.mjs";
import { socketService } from "../../app.mjs";


class PostService {
    postRepository;
    userRepo;
    constructor(postRepository, userRepo) {
        this.postRepository = postRepository;
        this.userRepo = userRepo;
    }
    // Create a new post (authenticated users only)
    createPost = async (postData) => {
        const transaction = await sequelize.transaction();
        try {
            // Convert the incoming data into a Post DTO
            const postReqDto = PostReqDTO.toDto(postData);

            // Check if the user exists
            const user = await this.userRepo.findById(postReqDto.userId);
            //console.log(postReqDto);
            if (!user) {
                throw new Error('User not found');
            }

            
            // Create the post
            const newPost = await postRepository.create(postReqDto, transaction);
            
            // Commit the transaction
            await transaction.commit();
            // Broadcast the post creation
            socketService.broadcastPostCreated(newPost);
            return newPost;
        } catch (error) {
            // Rollback if there was an error
            await transaction.rollback();
            throw new Error('Post creation failed');
        }
    };
        // Get all posts (optionally filtered by userId)
        getAllPosts = async (userId = null) => {
            return await postRepository.getAll(userId);
        };
    
        // Get a post by ID
        getPostById = async (id) => {
            const post = await postRepository.getById(id);
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        };
    
        // Update post (authenticated user and post owner only)
        updatePost = async (id, postData, userId) => {
            const transaction = await sequelize.transaction();
            try {
                const post = await postRepository.getById(id);
                if (!post) {
                    throw new Error('Post not found');
                }
    
                // Check if the authenticated user is the owner of the post
                if (post.userId !== userId) {
                    throw new Error('You can only update your own posts');
                }
    
                const postDto = PostUpdateReqDTO.toDto({ ...postData, userId, id });
                const updatedPost = await postRepository.updateById(id, postDto, transaction);
                
                // Commit the transaction
                await transaction.commit();
                // Broadcast the post update
                socketService.broadcastPostUpdated(updatedPost);
                return updatedPost;
            } catch (error) {
                // Rollback if there was an error
                await transaction.rollback();
                throw new Error('Post update failed');
            }
        };
    
        // Delete post (authenticated user and post owner only)
        deletePost = async (id, userId) => {
            const transaction = await sequelize.transaction();
            try {
                const post = await postRepository.getById(id);
                if (!post) {
                    throw new Error('Post not found');
                }
    
                // Check if the authenticated user is the owner of the post
                if (post.userId !== userId) {
                    throw new Error('You can only delete your own posts');
                }
    
                await postRepository.deleteById(id, transaction);
                
                // Commit the transaction
                await transaction.commit();
                // Broadcast the post deletion
                socketService.broadcastPostDeleted(id);
                return { message: 'Post deleted successfully' };
            } catch (error) {
                // Rollback if there was an error
                await transaction.rollback();
                throw new Error('Post deletion failed');
            }
        };


}

export default new PostService(postRepository,userRepo);
