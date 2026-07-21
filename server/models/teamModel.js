const pool = require("../config/database");

class TeamModel {
  static async getAllTeam(limit, offset) {
    const [rows] = await pool.query("SELECT * FROM team LIMIT ? OFFSET ?",[limit, offset]);
    return rows;
  }
}
module.exports = TeamModel;
