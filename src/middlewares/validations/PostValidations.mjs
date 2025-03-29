import {body,validationResult,param} from "express-validator";

// Validation for creating a post
export const createPostValidation = [
    body('tittle')
      .notEmpty().withMessage('Tittle is required'),
    body('content')
      .notEmpty().withMessage('Content is required'),
    
    // Middleware to check validation result
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
// Validation for updating a post
export const updatePostValidation = [
    param('id')
      .notEmpty().withMessage('Id is required'),
    body('tittle')
      .notEmpty().withMessage('Tittle is required'),
    body('content')
      .notEmpty().withMessage('Content is required'),
    
    // Middleware to check validation result
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const getPostByIdValidation = [
    param('id')
      .notEmpty().withMessage('Id is required')
      .isNumeric().withMessage('Id must be a number'),
    
    // Middleware to check validation result
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];