const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

router.post('/', ContactController.postContact);
router.get('/', authenticate, ContactController.getContact);
router.get('/all', authenticate, isAdmin, ContactController.getAllContacts);


module.exports = router;