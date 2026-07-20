import express from 'express';
import postController from '../controllers/post.controller.js';
import multer from 'multer'; // Multer - Used as a Middleware
import identifyUser from '../middlewares/auth.middleware.js';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const postRouter = express.Router();


/**
 * POST /api/posts [protected - means jiske pass token hoga woh hi iss api ko access kar sakta hai.]
 * - req.body = { caption,image-file }
*/
postRouter.post("/", upload.single('Img'), identifyUser, postController.createPost);
  // req.file is the `batman` file
  // req.body will hold the text fields, if there were any


/**
 * GET /api/posts/ [protected]
 */
postRouter.get("/", identifyUser, postController.getPost);


/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);


/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/like/:postId", identifyUser, postController.likePost)


/**
 * @route POST /api/posts/dislike/:postid
 * @description dislike a post with the id provided in the request params. 
 */
postRouter.post("/dislike/:postId", identifyUser, postController.dislikePost)


export default postRouter;