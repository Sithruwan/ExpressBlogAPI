class PostReqDTO {
    constructor(tittle, content, userId) {
        this.tittle = tittle;
        this.content = content;
        this.userId = userId;
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

        return data;
    }

    static toDto(user) {
        // Validate first
        const validatedUser = this.validate(user);

        // Transform to DTO
        return new PostReqDTO(
            validatedUser.tittle,
            validatedUser.content,
            validatedUser.userId
        );
    }
}

export default PostReqDTO;