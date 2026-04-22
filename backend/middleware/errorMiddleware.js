const mongoose = require("mongoose");

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (error, req, res, next) => {
  console.error("ERROR:", error);
  const statusCode = error.statusCode || 500;

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: "Invalid identifier format.",
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate resource value.",
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error.",
  });
};

module.exports = { notFoundHandler, errorHandler };
