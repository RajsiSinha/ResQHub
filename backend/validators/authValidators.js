const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("is required")
    .isLength({ min: 2, max: 120 })
    .withMessage("must be between 2 and 120 chars"),
  body("email").trim().isEmail().withMessage("must be a valid email").normalizeEmail(),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("must be at least 8 characters"),
  body("role")
    .isIn(["victim", "responder", "admin"])
    .withMessage("must be victim, responder, or admin"),
];

const loginValidator = [
  body("email").trim().isEmail().withMessage("must be a valid email").normalizeEmail(),
  body("password").isString().notEmpty().withMessage("is required"),
];

module.exports = { registerValidator, loginValidator };
