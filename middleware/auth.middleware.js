const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Get the token from cookies
  const token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user info in the request for future use in routes
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
