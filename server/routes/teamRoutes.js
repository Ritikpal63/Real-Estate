const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');
const upload = require("../middleware/upload");
const { authenticate } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");


router.get('/', TeamController.getTeam);
router.get('/all', TeamController.getAllTeam)
router.post('/addteam', authenticate, isAdmin, upload.single("image"), TeamController.addTeam);
router.delete('/:id', authenticate, isAdmin, TeamController.deleteTeamMember);


module.exports = router;