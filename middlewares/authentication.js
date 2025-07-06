const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new UnauthorizedError("Authentication invalid!");
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(payload.userId).select("-password")
    if(!user) throw new UnauthorizedError("Authentication invalid");
    req.user = {...user, userId: user._id};
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid!");
  }
};

module.exports = auth;
