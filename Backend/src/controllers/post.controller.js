import likeModel from "../models/like.model.js";
import postModel from "../models/post.model.js";

// ImageKit SDK is used to upload images to the cloud.
import ImageKit, { toFile } from "@imagekit/nodejs";

function getImageKitClient() {
  return new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}

async function createPost(req, res) {
  // req.body -> Contains text fields (caption)
  // req.file -> Contains uploaded image (provided by Multer)
  console.log(req.body, req.file);

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
    file: await toFile(Buffer.from(req.file.buffer), "file"), // Convert binary buffer into a File object.
    fileName: req.file.originalname, // Name of the uploaded file inside ImageKit.
    folder: "Pixora_files", // Folder inside ImageKit dashboard.
  });

  /*
  |--------------------------------------------------------------------------
  | Save Post
  |--------------------------------------------------------------------------
  | Store caption, uploaded image URL and user id in MongoDB.
  |--------------------------------------------------------------------------
  */
  const post = await postModel.create({
    caption: req.body.Caption, // Caption entered by the user.
    imgURL: file.url, // URL returned by ImageKit after successful upload.
    user: req.user.id, // Logged-in user's id obtained from JWT.
  });

  // Send success response to the frontend.
  return res.status(201).json({
    message: "Post created successfully.",
    post,
  });
}

async function getPost(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  return res.status(200).json({
    message: "Posts fetched successfully.",
    posts,
  });
}

async function getPostDetails(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "Post details fetched successfully.",
    post,
  });
}

async function likePost(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const like = await likeModel.create({
    user: username,
    post: postId,
  });

  return res.status(200).json({
    message: "Post liked successfully.",
    like,
  });
}

async function dislikePost(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const isPostAlreadyLiked = await likeModel.findById(postId);

  if (!isPostAlreadyLiked) {
    return res.status(200).json({
      message: "You didn't have liked the post.",
    });
  }

  const dislike = await likeModel.findByIdAndDelete(isPostAlreadyLiked.id);

  return res.status(200).json({
    message: "You have disliked the post successfully.",
    dislike,
  });
}

async function getFeed(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (await postModel.find({}).populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked);

      return post;
    }),
  );

  res.status(200).json({
    message: "posts fetched successfully.",
    posts,
  });
}

export default {
  createPost,
  getPost,
  getPostDetails,
  likePost,
  dislikePost,
  getFeed,
};
