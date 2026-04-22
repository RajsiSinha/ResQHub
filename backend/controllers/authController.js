const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, createHttpError } = require("../utils/apiResponse");
const { generateAccessToken } = require("../utils/jwt");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw createHttpError(409, "User already exists with this email.");
  }

  const user = await User.create({ name, email, password, role });
  const token = generateAccessToken(user);

  return sendSuccess(
    res,
    "User registered successfully.",
    {
      token,
      user: user.toJSON(),
    },
    201
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw createHttpError(401, "Invalid email or password.");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw createHttpError(401, "Invalid email or password.");
  }

  const token = generateAccessToken(user);

  return sendSuccess(res, "Login successful.", {
    token,
    user: user.toJSON(),
  });
});

module.exports = { register, login };
