const express = require("express");

const router = express.Router();

const ServiceController = require("../controllers/serviceController");

const { authenticate } = require("../middleware/auth");

const { isAdmin } = require("../middleware/isAdmin");

router.post("/query", ServiceController.submitQuery);

router.get("/", ServiceController.getAll);

router.get("/all", ServiceController.getAllServices);

router.get("/:id", ServiceController.getById);

router.post("/", authenticate, isAdmin, ServiceController.createService);

router.put("/:id", authenticate, isAdmin, ServiceController.updateService);

router.delete("/:id", authenticate, isAdmin, ServiceController.deleteService);

module.exports = router;
