const pool = require("../config/database");

class TeamModel{
    static async getAllTeam(){
        const [rows] = await pool.query("SELECT * FROM team");
        return rows;
    }
}
module.exports = TeamModel;