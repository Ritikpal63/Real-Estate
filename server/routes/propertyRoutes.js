const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { authenticate } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const PropertyController = require("../controllers/propertyController");

// Public Routes
router.get("/", PropertyController.getAllProperties);
router.get("/all", PropertyController.getAll);

// Most Viewed Properties
router.get("/most-viewed", PropertyController.getMostViewedProperties);

// Property Details
router.get("/:id", PropertyController.getPropertyById);

// Increase View
router.post("/:id/view", PropertyController.addPropertyView);

// Admin Routes
router.post(
  "/",
  authenticate,
  isAdmin,
  upload.single("image"),
  PropertyController.createProperty,
);

router.put(
  "/:id",
  authenticate,
  isAdmin,
  upload.single("image"),
  PropertyController.updateProperty,
);

router.delete("/:id", authenticate, isAdmin, PropertyController.deleteProperty);

module.exports = router;
