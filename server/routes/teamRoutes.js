const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');
const upload = require("../middleware/upload");


router.get('/', TeamController.getTeam);
router.get('/all', TeamController.getAllTeam)
router.post('/addteam', upload.single("image"), TeamController.addTeam);
router.delete('/:id', TeamController.deleteTeamMember);


module.exports = router;