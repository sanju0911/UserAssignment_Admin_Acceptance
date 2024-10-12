const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminModel.js");
const Assignment = require("../Models/assignment");

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = new Admin({ name, email, password: hashedPassword });
    const savedAdmin = await admin.save();
    const token = jwt.sign(
      { id: savedAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ token, admin: savedAdmin });
  } catch (error) {
    res.status(500).json({ error: "Server encountered an issue." });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password." });
    }
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server encountered an issue." });
  }
};

exports.fetchAssignments = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const assignments = await Assignment.find({ admin: adminId });
    if (assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found." });
    }
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Server encountered an issue." });
  }
};

exports.acceptAssignment = async (req, res) => {
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
    res.status(500).json({ error: "Server encountered an issue." });
  }
};

exports.rejectAssignment = async (req, res) => {
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
    res.status(500).json({ error: "Server encountered an issue." });
  }
};
