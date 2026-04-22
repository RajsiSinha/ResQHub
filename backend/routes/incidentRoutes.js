const express = require("express");

const {
  createIncident,
  getIncidents,
  assignIncident,
  resolveIncident,
  reassignIncident,
  deleteIncident,
  getEscalatedIncidents,
  syncIncidents,
  patchIncident,
} = require("../controllers/incidentController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeMiddleware");
const { validateRequest } = require("../middleware/validationMiddleware");
const {
  createIncidentValidator,
  assignIncidentValidator,
  resolveIncidentValidator,
  reassignIncidentValidator,
  deleteIncidentValidator,
  patchIncidentValidator,
} = require("../validators/incidentValidators");

const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  authorizeRoles("victim", "admin"),
  createIncidentValidator,
  validateRequest,
  createIncident
);

router.post("/sync", authorizeRoles("victim", "admin"), syncIncidents);

router.get("/", authorizeRoles("responder", "admin", "victim"), getIncidents);
router.get("/escalated", authorizeRoles("responder", "admin"), getEscalatedIncidents);

router.patch(
  "/:id/assign",
  authorizeRoles("admin"),
  assignIncidentValidator,
  validateRequest,
  assignIncident
);

router.patch(
  "/:id",
  authorizeRoles("responder", "admin"),
  patchIncidentValidator,
  validateRequest,
  patchIncident
);

router.patch(
  "/:id/resolve",
  authorizeRoles("responder"),
  resolveIncidentValidator,
  validateRequest,
  resolveIncident
);

router.patch(
  "/:id/reassign",
  authorizeRoles("admin"),
  reassignIncidentValidator,
  validateRequest,
  reassignIncident
);

router.delete(
  "/:id",
  authorizeRoles("admin"),
  deleteIncidentValidator,
  validateRequest,
  deleteIncident
);

module.exports = router;
