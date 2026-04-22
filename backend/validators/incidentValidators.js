const { body, param } = require("express-validator");

const objectIdValidator = (field) =>
  param(field).isMongoId().withMessage("must be a valid MongoDB id");

const createIncidentValidator = [
  body("title").trim().notEmpty().withMessage("is required").isLength({ max: 180 }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("is required")
    .isLength({ max: 2000 })
    .withMessage("must be at most 2000 chars"),
  body("severity")
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("must be LOW, MEDIUM, or HIGH"),
  body("location.lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("must be a valid latitude"),
  body("location.lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("must be a valid longitude"),
];

const assignIncidentValidator = [
  objectIdValidator("id"),
  body("responderId").isMongoId().withMessage("must be a valid responderId"),
];

const resolveIncidentValidator = [objectIdValidator("id")];

const reassignIncidentValidator = [
  objectIdValidator("id"),
  body("responderId").isMongoId().withMessage("must be a valid responderId"),
];

const deleteIncidentValidator = [objectIdValidator("id")];

const patchIncidentValidator = [
  objectIdValidator("id"),
  body("status")
    .isIn(["PENDING", "ASSIGNED", "RESOLVED"])
    .withMessage("status must be one of PENDING, ASSIGNED, RESOLVED"),
  body("assignedTo")
    .optional({ nullable: true })
    .isString()
    .withMessage("assignedTo must be a string (responder name or id)"),
];

module.exports = {
  createIncidentValidator,
  assignIncidentValidator,
  resolveIncidentValidator,
  reassignIncidentValidator,
  deleteIncidentValidator,
  patchIncidentValidator,
};
