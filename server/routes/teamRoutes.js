// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
// const {authenticate} = require('../middleware/auth'); 
// Public routes
router.get('/', TeamController.getAllTeam);

// Protected routes (admin only)
// router.post('/',  authenticate, TeamController.create);
// router.put('/:id', authenticate, TeamController.update);
// router.delete('/:id', authenticate, TeamController.delete);

module.exports = router;