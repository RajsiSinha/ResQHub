const express = require("express");

const { listUsers } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authorizeMiddleware");

const router = express.Router();

// Admin directory access (used for responder assignment dropdowns)
router.get("/", authenticate, authorizeRoles("admin"), listUsers);

module.exports = router;

