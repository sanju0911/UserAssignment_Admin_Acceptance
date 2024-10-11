const bcryptTool = require("bcryptjs");
const jwtTool = require("jsonwebtoken");
const UserModel = require("../Models/Usermodel");
const TaskModel = require("../Models/assignment");

const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let existingAdmin = await UserModel.findOne({ username });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already registered" });

    let newAdmin = new UserModel({ username, password, role: "admin" });
    const saltFactor = await bcryptTool.genSalt(10);
    newAdmin.password = await bcryptTool.hash(password, saltFactor);

    await newAdmin.save();

    const jwtPayload = { user: { id: newAdmin.id } };
    jwtTool.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).send("Server error during admin registration");
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let adminUser = await UserModel.findOne({ username });
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(400).json({ message: "Invalid login credentials" });
    }

    const passwordCheck = await bcryptTool.compare(
      password,
      adminUser.password
    );
    if (!passwordCheck)
      return res.status(400).json({ message: "Invalid login credentials" });

    const jwtPayload = { user: { id: adminUser.id } };
    jwtTool.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).send("Server error during login");
  }
};

const getAdminAssignments = async (req, res) => {
  try {
    const adminTasks = await TaskModel.find({ adminId: req.user.id })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json(adminTasks);
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    res.status(500).send("Error retrieving assignments");
  }
};

const approveAssignment = async (req, res) => {
  try {
    let taskItem = await TaskModel.findById(req.params.id);
    if (!taskItem) return res.status(404).json({ message: "Task not found" });
    if (taskItem.adminId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to approve this task" });
    }

    taskItem.status = "approved";
    await taskItem.save();
    res.json({ message: "Task approved successfully" });
  } catch (error) {
    console.error("Approval Error:", error.message);
    res.status(500).send("Server error while approving task");
  }
};

const denyAssignment = async (req, res) => {
  try {
    let taskItem = await TaskModel.findById(req.params.id);
    if (!taskItem) return res.status(404).json({ message: "Task not found" });
    if (taskItem.adminId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to reject this task" });
    }

    taskItem.status = "rejected";
    await taskItem.save();
    res.json({ message: "Task rejected successfully" });
  } catch (error) {
    console.error("Rejection Error:", error.message);
    res.status(500).send("Server error while rejecting task");
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminAssignments,
  approveAssignment,
  denyAssignment,
};
