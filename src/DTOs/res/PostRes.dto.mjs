class PostResDTO {
    constructor(tittle, content, userId, id, createdAt, updatedAt) {
        this.tittle = tittle;
        this.content = content;
        this.userId = userId;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static validate(data) {
        // Basic validation
        if (!data.tittle) {
            throw new Error('Tittle is required');
        }

        if (!data.content) {
            throw new Error('Content is required');
        }

        if (!data.userId) {
            throw new Error('User ID is required');
        }
        if (!data.id) {
            throw new Error('Id is required');
        }
        if (!data.createdAt) {
            throw new Error('createdAt is required');
        }
        if (!data.updatedAt) {
            throw new Error('updatedAt is required');
        }

        return data;
    }

    static toDto(user) {
        // Validate first
        const validatedUser = this.validate(user);

        // Transform to DTO
        return new PostResDTO(
            validatedUser.tittle,
            validatedUser.content,
            validatedUser.userId,
            validatedUser.id,
            validatedUser.createdAt,
            validatedUser.updatedAt
        );
    }
}

export default PostResDTO;