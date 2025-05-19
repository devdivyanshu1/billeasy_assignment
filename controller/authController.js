const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ message: "User created" });
  } catch {
    res.status(400).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Login error" });
  }
};

