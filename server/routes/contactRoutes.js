const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController')

router.post('/', ContactController.postContact);
router.get('/all', ContactController.getContact);


module.exports = router;