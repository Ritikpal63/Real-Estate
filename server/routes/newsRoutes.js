// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');
const {authenticate} = require('../middleware/auth'); 
const {isAdmin} = require('../middleware/isAdmin')
const upload = require('../middleware/upload');
// Public routes
router.get('/', NewsController.getAll);
router.get('/allnews', NewsController.getAllNews)
router.get('/latest', NewsController.getLatest);
router.get('/search', NewsController.search);
router.get('/category/:category', NewsController.getByCategory);
router.get('/:id', NewsController.getById);

// Protected routes (admin only)
router.post('/',  authenticate, isAdmin, upload.single("image"), NewsController.create);
router.put('/:id', authenticate, isAdmin, NewsController.update);
router.delete('/:id', authenticate, isAdmin, NewsController.delete);

module.exports = router;