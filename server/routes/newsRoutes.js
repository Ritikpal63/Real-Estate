// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', NewsController.getAll);
router.get('/latest', NewsController.getLatest);
router.get('/search', NewsController.search);
router.get('/category/:category', NewsController.getByCategory);
router.get('/:id', NewsController.getById);

// Protected routes (admin only)
router.post('/',  NewsController.create);
router.put('/:id', auth, NewsController.update);
router.delete('/:id', auth, NewsController.delete);

module.exports = router;