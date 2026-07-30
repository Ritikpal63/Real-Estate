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
  static async getAllTeam(req, res) {
    try {
      const allTeam = await TeamModel.getAll();
      res.json({
        success: true,
        data: allTeam,
        count: allTeam.length,
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
  static async addTeam(req, res) {
    try {
      const {
        name,
        designation,
        email,
        phone,
        facebook,
        instagram,
        twitter,
        about,
      } = req.body;

      const image = req.file ? req.file.filename : null;

      const addedTeamMember = await TeamModel.add(
        name,
        designation,
        email,
        phone,
        facebook,
        instagram,
        twitter,
        about,
        image,
      );

      res.json({
        success: true,
        message: "Team member added successfully",
        data: addedTeamMember,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to add team member",
        error: error.message,
      });
    }
  }
  static async deleteTeamMember(req, res) {
    try {
      const { id } = req.params;
      
      // Check if team member exists
      const existing = await TeamModel.getById(id);
      console.log("Existing Team Member", existing)
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Team member not found' });
      }
      
      await TeamModel.delete(id);
      
      res.json({ 
        success: true, 
        message: 'Team member deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      res.status(500).json({ success: false, message: 'Failed to delete team member', error: error.message });
    }
  }
}
module.exports = TeamController;
