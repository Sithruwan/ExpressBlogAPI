import Post from "../models/Post.model.mjs";

class PostRepository {

    constructor(model) {
        this.model = model;
    }

    // Create a new post
    create = async (postData, transaction) => {
        return await Post.create(postData, { transaction });
    };

    // Get all posts (optionally filtered by userId)
    getAll = async (userId = null) => {
        const whereClause =userId ? { userId: userId } : {}; 
        console.log('Where clause:',    whereClause);
        return await Post.findAll({ where: whereClause });
    };

    // Get post by ID
    getById = async (id) => {
        return await Post.findByPk(id);
    };

    // Update a post by ID
    updateById = async (id, postData, transaction) => {
        const post = await Post.findByPk(id);
        if (post) {
            return await post.update(postData, { transaction });
        }
        return null;
    };

    // Delete a post by ID
    deleteById = async (id, transaction) => {
        const post = await Post.findByPk(id);
        if (post) {
            await post.destroy({ transaction });
            return true;
        }
        return false;
    };
}

export default new PostRepository(Post);