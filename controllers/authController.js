const asyncErrHandler = require("../utils/asyncErrorHandler");
const { BadRequestError, UnauthorizedError } = require("../errors");
const User = require("../models/User");
const { sendSuccessResponse } = require("../helper/response");

const register = asyncErrHandler(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();
  sendSuccessResponse(
    res,
    { user: { id: user._id, name: user.name }, token },
    "User Registered Successfully.",
    201
  );
});

const login = asyncErrHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Email and Password are required to login.");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthorizedError("Invalid Credentails");
  const isCorrectPassword = await user.checkPassword(password);
  if (!isCorrectPassword) throw new UnauthorizedError("Invalid Credentials");
  const token = user.generateToken();
  sendSuccessResponse(res, { token }, "User logged in successfully", 200);
});

module.exports = {
  register,
  login,
};
