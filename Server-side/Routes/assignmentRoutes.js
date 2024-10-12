const express = require("express");
const {
  uploadAssignment,
  fetchAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../Controllers/assignmentController");

const route = express.Router();

route.post("/upload", uploadAssignment);
route.get("/assignments/:adminId", fetchAssignments);
route.post("/assignments/:id/accept", acceptAssignment);
route.post("/assignments/:id/reject", rejectAssignment);

module.exports = route;
