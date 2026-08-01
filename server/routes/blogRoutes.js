const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController')
const upload = require('../middleware/upload');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

router.post('/',authenticate, isAdmin, upload.single('image'), BlogController.postBlog);
router.get('/', BlogController.getByIdBlog);
router.get('/all',  BlogController.getAllBlogs);
router.delete('/:id', authenticate, isAdmin, BlogController.deleteBlog);
router.put('/:id', authenticate, isAdmin, upload.single('image'), BlogController.update);




module.exports = router;