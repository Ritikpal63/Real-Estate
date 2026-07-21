const TeamModel = require("../models/teamModel");

class TeamController {
  static async getTeam(req, res) {
    try {
      const { limit, offset } = req.query;
      const parsedLimit = Number.isNaN(parseInt(limit, 10))
        ? 10
        : parseInt(limit, 10);
      const parsedOffset = Number.isNaN(parseInt(offset, 10))
        ? 0
        : parseInt(offset, 10);

      const team = await TeamModel.getAllTeam(parsedLimit, parsedOffset);

      res.json({
        success: true,
        data: team,
        count: team.length,
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
  static async getAllTeam(req, res){
    try {
      const allTeam = await TeamModel.getAllTeam()
    res.json({
      success:true,
      data:allTeam,
      count:allTeam.length
    })
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
