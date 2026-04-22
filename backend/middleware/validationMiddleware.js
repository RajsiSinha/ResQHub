const { validationResult } = require("express-validator");

const { createHttpError } = require("../utils/apiResponse");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return next(
    createHttpError(
      422,
      `Validation failed: ${errors
        .array()
        .map((e) => `${e.path} ${e.msg}`)
        .join(", ")}`
    )
  );
};

module.exports = { validateRequest };
