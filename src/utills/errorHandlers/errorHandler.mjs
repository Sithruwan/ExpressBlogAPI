import AppError from "./AppError.mjs";

const errorHandler = (err, req, res, next) => {


  // Check if it's an instance of AppError
  if (err instanceof AppError) {
      console.error(`Error in ${err.layer}: ${err.message}`);

      return res.status(err.statusCode).json({
          status: 'error',
          message: err.message,
          layer: err.layer,  // Optionally, you can log or send back the layer info
      });
  }

  // If it's not an AppError, log it and send a generic 500 error response
  console.error('Unexpected Error:', err);
  return res.status(500).json({
      status: 'error',
      message: 'Internal server error',  // Generic message for unexpected errors
      details: err.message || 'Something went wrong',  // Details about the error (if available)
  });
};

export default errorHandler;
