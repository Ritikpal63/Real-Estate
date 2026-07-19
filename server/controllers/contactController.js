const ContactModel = require("../models/contactModel");

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
}
module.exports = ContactController;
