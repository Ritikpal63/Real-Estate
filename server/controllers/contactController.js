const ContactModel = require("../models/contactModel");
const pool = require("../config/database");

class ContactController {
  static async postContact(req, res) {
    try {
      const { name, email, message } = req.body;
      if (!email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const contact = await ContactModel.create({ name, email, message });
      res.status(201).json({ success: true, data: contact });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  static async getContact(req, res) {
    try {
      const total = await ContactModel.getCount();

      res.json({
        success: true,
        pagination: {
          total
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  static async getAllContacts(req, res) {
    const [rows] = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
    res.json({ success: true, data: rows });
  }
}
module.exports = ContactController;
