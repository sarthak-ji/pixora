import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/***************************** REGISTER-CONTROLLER *****************************/
async function register(req, res) {
  const { username, email, password, profile_pic, bio } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      {
        email: user.email,
      },
      {
        username: user.username,
      },
    ],
  });

  if (isUserAlreadyExists) {
    res.status(409).json({
      message:
        "User already exists" +
        (isUserAlreadyExists.username
          ? "Username already exists"
          : "Email already exists"),
    });
  }

  // Password hashing..
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_pic,
  });

  // Token generation..
  /*
        - user ka data hona chahiye.
        - data unique hona chahiye.
    */
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_pic: user.profile_pic,
    },
  });
}

/***************************** LOGIN-CONTROLLER *****************************/
async function login(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      {
        email: user.email,
      },
      {
        username: user.username,
      },
    ],
  });

  if (!isUserAlreadyExists) {
    res.status(404).json({
      message: "User not found.",
    });
  }

  // Comparing the password..
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({
      message: "Invalid password.",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);


  res.status(201).json({
    message: "User loggedIn successfully.",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_pic: user.profile_pic,
    },
  });
}

export default {
    register,
    login
};
