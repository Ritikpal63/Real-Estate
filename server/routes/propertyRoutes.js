const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const PropertyController = require("../controllers/propertyController");

// router.get('/', PropertyController.getPropertyCount)
router.get("/", PropertyController.getAllProperties);
router.get("/:id", PropertyController.getPropertyById);

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
