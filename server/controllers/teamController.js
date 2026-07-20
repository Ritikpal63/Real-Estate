const TeamModel = require("../models/teamModel");

class TeamController {
  static async getAllTeam(req, res) {
    try {
      // const { limit = 10, offset = 0 } = req.query;
      const team = await TeamModel.getAllTeam();

      res.json({
        success: true,
        data: team
      });
    } catch (error) {
      console.error("Error fetching team:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to fetch team",
          error: error.message,
        });
    }
  }
}
module.exports = TeamController;
