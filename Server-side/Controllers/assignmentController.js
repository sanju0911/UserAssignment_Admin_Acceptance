const Assignment = require("../Models/assignment");

const uploadAssignment = async (req, res) => {
  try {
    const assignmentData = new Assignment(req.body);
    const savedAssignment = await assignmentData.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const fetchAssignments = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const assignments = await Assignment.find({ admin: adminId });
    if (assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found." });
    }
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const acceptAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }
    assignment.status = "Accepted";
    const updatedAssignment = await assignment.save();
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

const rejectAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }
    assignment.status = "Rejected";
    const updatedAssignment = await assignment.save();
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = {
  uploadAssignment,
  fetchAssignments,
  acceptAssignment,
  rejectAssignment,
};
