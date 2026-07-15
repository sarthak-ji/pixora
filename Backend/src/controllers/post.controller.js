import postModel from "../models/post.model.js";
import jwt from "jsonwebtoken";

// ImageKit SDK is used to upload images to the cloud.
import ImageKit, { toFile } from "@imagekit/nodejs";

/*
|--------------------------------------------------------------------------
| ImageKit Client
|--------------------------------------------------------------------------
| Creates and returns a new ImageKit instance using the credentials
| stored in the .env file.
|
| We keep this in a separate function instead of creating it globally
| so that environment variables are already loaded before the client
| is initialized.
|--------------------------------------------------------------------------
*/
function getImageKitClient() {
  return new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}

/*
|--------------------------------------------------------------------------
| Create Post Controller
|--------------------------------------------------------------------------
| Flow:
|
| 1. Receive caption + image from the client.
| 2. Check whether the user is logged in.
| 3. Verify the JWT token.
| 4. Upload the image to ImageKit.
| 5. Save the post details in MongoDB.
| 6. Return the created post.
|--------------------------------------------------------------------------
*/
async function createPost(req, res) {

  // req.body -> Contains text fields (caption)
  // req.file -> Contains uploaded image (provided by Multer)
  console.log(req.body, req.file);

  // Get JWT token stored inside cookies.
  const token = req.cookies.token;

  // If no token exists, user is not authenticated.
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access.",
    });
  }

  let decoded = null;

  try {
    // Verify whether the JWT token is valid.
    // If valid, decoded will contain the user's information.
    decoded = jwt.verify(token, process.env.JWT_SECRET);

  } catch (err) {

    // Invalid or expired token.
    return res.status(401).json({
      message: "Unauthorized access.",
    });
  }

  // Create an ImageKit client for uploading files.
  const client = getImageKitClient();

  /*
  |--------------------------------------------------------------------------
  | Upload Image
  |--------------------------------------------------------------------------
  | req.file.buffer contains the uploaded image as binary data.
  |
  | ImageKit expects a File object, so Buffer is converted using toFile().
  |--------------------------------------------------------------------------
  */
  const file = await client.files.upload({

    // Convert binary buffer into a File object.
    file: await toFile(Buffer.from(req.file.buffer), "file"),

    // Name of the uploaded file inside ImageKit.
    fileName: "Black_batman",

    // Folder inside ImageKit dashboard.
    folder: "Pixora_files",
  });

  /*
  |--------------------------------------------------------------------------
  | Save Post
  |--------------------------------------------------------------------------
  | Store caption, uploaded image URL and user id in MongoDB.
  |--------------------------------------------------------------------------
  */
  const post = await postModel.create({

    // Caption entered by the user.
    caption: req.body.caption,

    // URL returned by ImageKit after successful upload.
    imgURL: file.url,

    // Logged-in user's id obtained from JWT.
    user: decoded.id,
  });

  // Send success response to the frontend.
  res.status(201).json({
    message: "Post created successfully.",
    post,
  });
}

export default createPost;