import { Router } from "express";
import UserController from "../controllers/User.controller.mjs";

const userRoutes = Router();

userRoutes.post('/register',UserController.registerUser);
userRoutes.post('/login',UserController.loginUser);

export default userRoutes;