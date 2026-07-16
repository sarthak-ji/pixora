import jwt from "jsonwebtoken";


async function identifyUser(req, res, next) {

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


  req.user = decoded;

  next();

}

export default identifyUser;