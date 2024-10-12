const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decodedPayload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
