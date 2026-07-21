const TeamModel = require("../models/teamModel");

class TeamController {
  static async getAllTeam(req, res) {
    try {
      const { limit } = req.query;
            const parsedLimit = limit !== undefined ? parseInt(limit, 10) : undefined;
      const team = await TeamModel.getAllTeam(parsedLimit);

      res.json({
        success: true,
        data: team,
        limit:parsedLimit
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
