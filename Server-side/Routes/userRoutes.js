const expressServer = require("express");
const userRouter = expressServer.Router();
const fileUpload = require("../middleware/uploadFile");
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

userRouter.post(
  "/upload",
  verifyUser("user"),
  fileUpload.single("file"),
  userAssignmentUpload
);

userRouter.get("/assignments", verifyUser("user"), userAssignments);

module.exports = userRouter;
