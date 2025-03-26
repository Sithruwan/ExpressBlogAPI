class UserReqDTO {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static validate(data) {
        // Basic validation
        if (!data.username) {
            throw new Error('Username is required');
        }
        if (!data.email) {
            throw new Error('Email is required');
        }
        if (!data.password) {
            throw new Error('Password is required');
        }

        // Optional: Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Invalid email format');
        }

        return data;
    }

    static toDto(user) {
        // Validate first
        const validatedUser = this.validate(user);

        // Transform to DTO
        return new UserReqDTO(
            validatedUser.username,
            validatedUser.email,
            validatedUser.password
        );
    }
}

export default UserReqDTO;