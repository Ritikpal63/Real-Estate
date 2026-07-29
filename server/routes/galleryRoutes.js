const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { authenticate } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const GalleryController = require("../controllers/galleryController");

// Public
router.get("/", GalleryController.getAll);
router.get("/category/:category", GalleryController.getByCategory);
router.get("/:id", GalleryController.getById);

// Admin only
router.post("/", authenticate, isAdmin, upload.single("image"), GalleryController.create);
router.put("/:id", authenticate, isAdmin, upload.single("image"), GalleryController.update);
router.delete("/:id", authenticate, isAdmin, GalleryController.delete);

module.exports = router;