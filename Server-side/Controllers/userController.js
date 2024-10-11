const bcryptTool = require("bcryptjs");
const jwtTool = require("jsonwebtoken");
const UserModel = require("../Models/Usermodel");
const TaskModel = require("../Models/assignment");

const userRegistration = async (req, res) => {
  const { username, password } = req.body;
  try {
    let existingUser = await UserModel.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already registered" });

    let newUser = new UserModel({ username, password, role: "user" });
    const saltFactor = await bcryptTool.genSalt(10);
    newUser.password = await bcryptTool.hash(password, saltFactor);

    await newUser.save();

    const jwtPayload = { user: { id: newUser.id } };
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
    console.error("User Registration Error:", error.message);
    res.status(500).send("Error during user registration");
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let userAccount = await UserModel.findOne({ username });
    if (!userAccount)
      return res.status(400).json({ message: "Invalid Credentials" });

    const passwordMatch = await bcryptTool.compare(
      password,
      userAccount.password
    );
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const jwtPayload = { user: { id: userAccount.id } };
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
    console.error("User Login Error:", error.message);
    res.status(500).send("Error during user login");
  }
};

const fetchAdmins = async (req, res) => {
  try {
    const adminAccounts = await UserModel.find({ role: "admin" }).select(
      "-password"
    );
    res.json(adminAccounts);
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    res.status(500).send("Error retrieving admins");
  }
};

const userAssignmentUpload = async (req, res) => {
  const { task, adminId } = req.body;

  if (!task && !req.file) {
    return res.status(400).json({ message: "Task or file required" });
  }

  try {
    const assignmentDetails = {
      userId: req.user.id,
      adminId,
      status: "pending",
    };

    if (task) {
      assignmentDetails.task = task;
    }

    if (req.file) {
      assignmentDetails.fileUrl = req.file.path;
      assignmentDetails.fileName = req.file.originalname;
    }

    const newAssignment = new TaskModel(assignmentDetails);
    await newAssignment.save();
    res.json({ message: "Task uploaded successfully" });
  } catch (error) {
    console.error("Assignment Upload Error:", error.message);
    res.status(500).send("Error uploading assignment");
  }
};

const userAssignments = async (req, res) => {
  try {
    const userTasks = await TaskModel.find({ userId: req.user.id })
      .populate("adminId", "username")
      .sort({ createdAt: -1 });
    res.json(userTasks);
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    res.status(500).send("Error retrieving assignments");
  }
};

module.exports = {
  userRegistration,
  userLogin,
  fetchAdmins,
  userAssignmentUpload,
  userAssignments,
};
