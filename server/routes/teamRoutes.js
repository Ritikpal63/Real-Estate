const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');


router.get('/', TeamController.getTeam);
router.get('/all', TeamController.getAllTeam)


module.exports = router;