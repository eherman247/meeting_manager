const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(_id).select("_id");
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = requireAuth;
