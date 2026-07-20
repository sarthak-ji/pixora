import express from 'express';
import identifyUser from '../middlewares/auth.middleware.js';
import authController from '../controllers/auth.controller.js';


const authRouter = express.Router();

/**
 * POST /api/auth/register
*/
authRouter.post("/register", authController.register);

/**
 * POST /api/auth/login
*/
authRouter.post("/login", authController.login);

/**
 * GET /api/auth/getMe
*/
authRouter.get("/getMe", identifyUser, authController.getMe);


export default authRouter;