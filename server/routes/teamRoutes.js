const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');


router.get('/', TeamController.getTeam);
router.get('/allteam', TeamController.getAllTeam)


module.exports = router;