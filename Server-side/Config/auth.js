const jwtTool = require("jsonwebtoken");
const Account = require("../Models/Usermodel");

const verifyAccess = (allowedRoles = []) => {
  return async (req, res, next) => {
    if (typeof allowedRoles === "string") {
      allowedRoles = [allowedRoles];
    }

    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Access denied, missing token" });
    }
    try {
      const decodedToken = jwtTool.verify(token, process.env.JWT_SECRET_KEY);
      req.currentUser = await Account.findById(decodedToken.user.id);

      if (
        allowedRoles.length &&
        !allowedRoles.includes(req.currentUser.accountType)
      ) {
        return res
          .status(403)
          .json({ message: "Forbidden: Role not authorized" });
      }
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid token provided" });
    }
  };
};

module.exports = verifyAccess;
