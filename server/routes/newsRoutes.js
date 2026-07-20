// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');
const {authenticate} = require('../middleware/auth'); 
// Public routes
router.get('/', NewsController.getAll);
router.get('/allnews', NewsController.getAllNews)
router.get('/latest', NewsController.getLatest);
router.get('/search', NewsController.search);
router.get('/category/:category', NewsController.getByCategory);
router.get('/:id', NewsController.getById);

// Protected routes (admin only)
router.post('/',  authenticate, NewsController.create);
router.put('/:id', authenticate, NewsController.update);
router.delete('/:id', authenticate, NewsController.delete);

module.exports = router;