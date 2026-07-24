const express = require('express')
const router = express.Router()

const PropertyController = require('../controllers/propertyController')

// router.get('/', PropertyController.getPropertyCount)
router.get('/', PropertyController.getAllProperty)


module.exports = router;