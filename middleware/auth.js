const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Auth token missing" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // { id: ..., email: ... }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
