const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, type } = req.body;
  const user = await User.create({ username, password, email, type });
  res.status(201).json(user);
});

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const payload = { id: user.id, username: user.username, type: user.type };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

  res.json({ token });
};
