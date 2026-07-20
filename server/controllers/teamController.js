const TeamModel = require("../models/teamModel");

class TeamController {
  static async getAllTeam(req, res) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const team = await TeamModel.getAllTeam(parseInt(limit), parseInt(offset));

      res.json({
        success: true,
        data: team,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
        },
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to fetch news",
          error: error.message,
        });
    }
  }
}
module.exports = TeamController;
