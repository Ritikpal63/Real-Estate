// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');
const ContactController = require('../controllers/contactController')
const {authenticate} = require('../middleware/auth'); 
// Public routes
router.get('/', NewsController.getAll);
router.get('/latest', NewsController.getLatest);
router.get('/search', NewsController.search);
router.get('/category/:category', NewsController.getByCategory);
router.get('/:id', NewsController.getById);
router.post('/api/contact', ContactController.postContact);

// Protected routes (admin only)
router.post('/',  authenticate, NewsController.create);
router.put('/:id', authenticate, NewsController.update);
router.delete('/:id', authenticate, NewsController.delete);

module.exports = router;