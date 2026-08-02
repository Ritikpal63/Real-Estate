const TeamModel = require("../models/teamModel");
const { toDisplayImageUrl } = require("../utils/imageUrl");

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
      const data = team.map((m) => ({
        ...m,
        image: toDisplayImageUrl(req, m.image),
      }));

      res.json({ success: true, data, count: data.length });
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

  static async getAllTeam(req, res) {
    try {
      const allTeam = await TeamModel.getAll();
      const data = allTeam.map((m) => ({
        ...m,
        image: toDisplayImageUrl(req, m.image),
      }));

      res.json({ success: true, data, count: data.length });
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

  static async getTeamMemberById(req, res) {
    try {
      const { id } = req.params;
      const member = await TeamModel.getById(id);
      if (!member) {
        return res
          .status(404)
          .json({ success: false, message: "Team member not found" });
      }
      res.json({
        success: true,
        data: { ...member, image: toDisplayImageUrl(req, member.image) },
      });
    } catch (error) {
      console.error("Error fetching team member:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to fetch team member",
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
      const image = req.file ? req.file.path : null; // full Cloudinary URL

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
        data: {
          ...addedTeamMember,
          image: toDisplayImageUrl(req, addedTeamMember.image),
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to add team member",
          error: error.message,
        });
    }
  }

  static async updateTeamMember(req, res) {
    try {
      const { id } = req.params;
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

      const existing = await TeamModel.getById(id);
      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: "Team member not found" });
      }

      // Keep the existing Cloudinary image unless a new file was uploaded
      const image = req.file ? req.file.path : existing.image;

      const updated = await TeamModel.update(id, {
        name: name || existing.name,
        designation: designation || existing.designation,
        email: email ?? existing.email,
        phone: phone ?? existing.phone,
        facebook: facebook ?? existing.facebook,
        instagram: instagram ?? existing.instagram,
        twitter: twitter ?? existing.twitter,
        about: about ?? existing.about,
        image,
      });

      res.json({
        success: true,
        message: "Team member updated successfully",
        data: { ...updated, image: toDisplayImageUrl(req, updated.image) },
      });
    } catch (error) {
      console.error("Error updating team member:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to update team member",
          error: error.message,
        });
    }
  }

  static async deleteTeamMember(req, res) {
    try {
      const { id } = req.params;
      const existing = await TeamModel.getById(id);
      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: "Team member not found" });
      }
      await TeamModel.delete(id);
      res.json({ success: true, message: "Team member deleted successfully" });
    } catch (error) {
      console.error("Error deleting team member:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to delete team member",
          error: error.message,
        });
    }
  }
}
module.exports = TeamController;
