import jwt from 'jsonwebtoken';

class SessionManager {
    static instance;

    constructor() {
        if (SessionManager.instance) {
            return SessionManager.instance;
        }
        
        // Initialize any necessary properties (e.g., JWT secrets)
        this.jwtSecret = process.env.JWT_SECRET_KEY;
        this.refreshSecret = process.env.JWT_REFRESH_SECRET;
        
        // Ensure Singleton instance
        SessionManager.instance = this;
    }

    // Generate an access token
    getToken(payload) {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '1d' });
    }

    // Generate a refresh token
    getRefreshToken(payload) {
        return jwt.sign(payload, this.refreshSecret, { expiresIn: '7d' });
    }

    // Decode a JWT token
    decodeToken(token) {
        return jwt.decode(token);
    }

    // Verify access token
    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Verify refresh token
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.refreshSecret);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

// Export the Singleton instance
export default new SessionManager();
