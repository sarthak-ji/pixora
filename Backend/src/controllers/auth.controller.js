import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/*
|--------------------------------------------------------------------------
| Register Controller
|--------------------------------------------------------------------------
| Flow:
|
| 1. Receive user details from frontend.
| 2. Check whether email or username already exists.
| 3. Hash the password before storing it.
| 4. Create a new user in MongoDB.
| 5. Generate a JWT token for future authentication.
| 6. Return user information (excluding password).
|--------------------------------------------------------------------------
*/
async function register(req, res) {

  // Extract all user details sent by the frontend.
  const { username, email, password, profile_pic, bio } = req.body;

  /*
  |--------------------------------------------------------------------------
  | Duplicate User Check
  |--------------------------------------------------------------------------
  | We don't want two users having the same email or username.
  | MongoDB's $or operator checks both conditions in a single query.
  |--------------------------------------------------------------------------
  */
  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      { email },
      { username },
    ],
  });

  // Stop registration if user already exists.
  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exists. " +
        (isUserAlreadyExists.username
          ? "Username already exists."
          : "Email already exists."),
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Password Hashing
  |--------------------------------------------------------------------------
  | Never store plain text passwords in the database.
  |
  | bcrypt converts the original password into a secure hash.
  | Salt Rounds = 10
  | Higher value = More secure but slower.
  |--------------------------------------------------------------------------
  */
  const hash = await bcrypt.hash(password, 10);

  /*
  |--------------------------------------------------------------------------
  | Create User
  |--------------------------------------------------------------------------
  | Save the user's information into MongoDB.
  | Store the hashed password instead of the original password.
  |--------------------------------------------------------------------------
  */
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_pic,
  });

  /*
  |--------------------------------------------------------------------------
  | JWT Token Generation
  |--------------------------------------------------------------------------
  | JWT is used to identify the logged-in user without asking
  | for credentials on every request.
  |
  | Payload should contain only the minimum information required.
  | Here we only store the user's MongoDB id.
  |--------------------------------------------------------------------------
  */
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  /*
  |--------------------------------------------------------------------------
  | Response
  |--------------------------------------------------------------------------
  | Never send sensitive information such as password or hashed
  | password back to the client.
  |--------------------------------------------------------------------------
  */
  return res.status(201).json({
    message: "User registered successfully.",

    // (Optional)
    // You can also send the token here if your frontend
    // stores JWT in localStorage instead of cookies.
    // token,

    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_pic: user.profile_pic,
    },
  });
}

/*
|--------------------------------------------------------------------------
| Login Controller
|--------------------------------------------------------------------------
| Flow:
|
| 1. Find the user using email or username.
| 2. Compare entered password with hashed password.
| 3. Generate JWT.
| 4. Store JWT inside an HTTP Cookie.
| 5. Return user details.
|--------------------------------------------------------------------------
*/
async function login(req, res) {

  // User can login using either email or username.
  const { username, email, password } = req.body;

  /*
  |--------------------------------------------------------------------------
  | Find User
  |--------------------------------------------------------------------------
  | Search MongoDB using either username or email.
  |--------------------------------------------------------------------------
  */
  const user = await userModel.findOne({
    $or: [
      { email },
      { username },
    ],
  });

  // User does not exist.
  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Password Verification
  |--------------------------------------------------------------------------
  | bcrypt.compare() hashes the entered password internally
  | and compares it with the stored hashed password.
  |--------------------------------------------------------------------------
  */
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password.",
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Generate JWT
  |--------------------------------------------------------------------------
  | The token proves the user's identity for future requests.
  |--------------------------------------------------------------------------
  */
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  /*
  |--------------------------------------------------------------------------
  | Store Token Inside Cookie
  |--------------------------------------------------------------------------
  | Browser automatically sends this cookie with every request.
  | This allows protected routes to identify the logged-in user.
  |--------------------------------------------------------------------------
  */
  res.cookie("token", token);

  /*
  |--------------------------------------------------------------------------
  | Success Response
  |--------------------------------------------------------------------------
  | Again, never send password or hash to the frontend.
  |--------------------------------------------------------------------------
  */
  return res.status(200).json({
    message: "User logged in successfully.",

    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_pic: user.profile_pic,
    },
  });
}


async function getMe(req, res) {

  const userId = req.user.id;

  const user = await userModel.findById(userId);

  if(!user){
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.status(200).json({
    message: "User details fetched successfully.",
    user: {
      username: user.username,
      email: user.email,
      profile_pic: user.profile_pic,
      bio: user.bio
    }
  });
}

export default {
  register,
  login,
  getMe
};