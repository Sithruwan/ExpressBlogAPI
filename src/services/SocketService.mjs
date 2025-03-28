

class SocketService {
    io;  // Socket.IO instance

    constructor(io) {
        this.io = io;
    }

    // Broadcast post creation
    broadcastPostCreated(post) {
        this.io.emit('postCreated', post);  // Broadcast to all connected clients
    }

    // Broadcast post update
    broadcastPostUpdated(updatedPost) {
        this.io.emit('postUpdated', updatedPost);  // Broadcast to all connected clients
    }

    // Broadcast post deletion
    broadcastPostDeleted(postId) {
        this.io.emit('postDeleted', `Post with ID ${postId} has been deleted`);  // Broadcast to all connected clients
    }
}

export default  SocketService;  // Export an instance of the SocketService class
