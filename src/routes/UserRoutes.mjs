import { Router } from "express";
import UserController from "../controllers/User.controller.mjs";
import { loginValidation, registerValidation } from "../middlewares/validations/UserValidations.mjs";

const userRoutes = Router();

userRoutes.post('/register',registerValidation,UserController.registerUser);
userRoutes.post('/login',loginValidation,UserController.loginUser);

export default userRoutes;