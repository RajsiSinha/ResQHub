const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const listUsers = asyncHandler(async (req, res) => {
  const { role } = req.query;

  const filter = {};
  if (role) {
    filter.role = role;
  }

  const users = await User.find(filter)
    .sort({ createdAt: -1 })
    .select("name email role createdAt");

  return sendSuccess(res, "Users fetched successfully.", users);
});

module.exports = { listUsers };

