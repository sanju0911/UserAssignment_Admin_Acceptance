const expressServer = require("express");
const userRouter = expressServer.Router();

const verifyUser = require("../Config/auth");
const {
  userRegistration,
  userLogin,
  fetchAdmins,
  userAssignmentUpload,
  userAssignments,
} = require("../Controllers/userController");

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);

userRouter.get("/admins", verifyUser("user"), fetchAdmins);

userRouter.get("/assignments", verifyUser("user"), userAssignments);

module.exports = userRouter;
