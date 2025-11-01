const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const LoginLog = require("../models/LoginLog");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Signup with hashed password + validations
exports.signup = async (req, res) => {
  try {
    const {
      name,
      lastName = "Unknown",
      email,
      phone,
      password,
      confirmPassword,
      role,
      agree,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !role ||
      agree === undefined
    )
      return res
        .status(400)
        .json({ message: "All fields are required including agree checkbox" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({
      name,
      lastName,
      email,
      phone,
      password,
      role,
      agree,
    });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    // Save login log
    await LoginLog.create({
      userId: user._id,
      role: user.role,
      ip: req.ip,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
