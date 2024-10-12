const express = require("express");
const {
  registerAdmin,
  adminLogin,
  fetchAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../Controllers/adminController");

const route = express.Router();

route.post("/register", registerAdmin);
route.post("/login", adminLogin);
route.get("/assignments/:adminId", fetchAssignments);
route.post("/assignments/:id/accept", acceptAssignment);
route.post("/assignments/:id/reject", rejectAssignment);

module.exports = route;
