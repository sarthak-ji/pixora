import express from 'express';
import followController from '../controllers/follow.controller.js';
import identifyUser from '../middlewares/auth.middleware.js';

const followRouter = express.Router();

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
followRouter.post("/follow/:username", identifyUser, followController.followUser);


/** 
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
followRouter.post("/unfollow/:username", identifyUser, followController.unfollowUser);


export default followRouter;