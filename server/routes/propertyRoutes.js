const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')

const PropertyController = require('../controllers/propertyController')

// router.get('/', PropertyController.getPropertyCount)
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", upload.single("image"), createProperty);
router.put("/:id", upload.single("image"), updateProperty);
router.delete("/:id", deleteProperty);


module.exports = router;