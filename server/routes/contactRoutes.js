const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController')

router.post('/contact', ContactController.postContact);


module.exports = router;