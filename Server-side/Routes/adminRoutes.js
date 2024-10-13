const express = require("express");
const {
  registerAdmin,
  adminLogin,
  fetchAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../Controllers/adminController");
const { auth } = require("../Config/auth");

const route = express.Router();

route.post("/register", registerAdmin);
route.post("/login", adminLogin);
route.get("/assignments", auth, fetchAssignments);
route.post("/assignments/:id/accept", auth, acceptAssignment);
route.post("/assignments/:id/reject", auth, rejectAssignment);

module.exports = route;
