const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/Usermodel");

exports.register = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: encryptedPassword,
      address,
    });
    const savedUser = await user.save();
    const token = jwt.sign(
      { id: savedUser._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error occurred during registration." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this email." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error occurred during login." });
  }
};
