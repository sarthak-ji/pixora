import express from 'express';
import createPost from '../controllers/post.controller.js';
import multer from 'multer'; // Multer - Used as a Middleware
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const postRouter = express.Router();


/**
 * POST /api/posts [protected - means jiske pass token hoga woh hi iss api ko access kar sakta hai]
 * - req.body = { caption,image-file }
*/
postRouter.post("/", upload.single('batman'), createPost);
  // req.file is the `batman` file
  // req.body will hold the text fields, if there were any


/**
 * GET /api/posts/ [protected]
 */




export default postRouter;