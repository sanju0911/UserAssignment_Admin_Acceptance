const expressApp = require("express");
const adminRouter = expressApp.Router();
const verifyToken = require("../middleware/authCheck");
const {
  registerAdmin,
  loginAdmin,
  getAdminAssignments,
  approveAssignment,
  denyAssignment,
} = require("../Controllers/adminController");

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);

adminRouter.get("/assignments", verifyToken("admin"), getAdminAssignments);
adminRouter.post(
  "/assignments/:id/accept",
  verifyToken("admin"),
  approveAssignment
);
adminRouter.post(
  "/assignments/:id/reject",
  verifyToken("admin"),
  denyAssignment
);

module.exports = adminRouter;
