const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const { getDashboardStats } = require("../controllers/adminController");

router.get("/dashboard", authenticate, isAdmin, getDashboardStats);

module.exports = router;
