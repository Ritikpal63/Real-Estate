const TeamModel = require("../models/teamModel");

class TeamController {
  static async getAllTeam(req, res) {
    try {
      const { limit, offset = 0 } = req.query;
      const parsedLimit = parseInt(limit, 10);
      const parsedOffset = parseInt(offset, 10);

      const team = await TeamModel.getAllTeam(parsedLimit, parsedOffset);

      res.json({
        success: true,
        data: team,
        count:team.length
      });
    } catch (error) {
      console.error("Error fetching team:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch team",
        error: error.message,
      });
    }
  }
}
module.exports = TeamController;
