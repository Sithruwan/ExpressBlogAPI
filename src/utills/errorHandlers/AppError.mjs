

class AppError extends Error {
    constructor(message, statusCode, layer) {
      super(message);
      this.statusCode = statusCode || 500;  // Default to 500 if no status code provided
      this.layer = layer || 'unknown';  // Indicate the layer where the error occurred
      this.isOperational = true;  // Set a flag to distinguish operational errors
      Error.captureStackTrace(this, this.constructor);  // Capture the stack trace for debugging
    }
  }
  
  export default AppError;
  