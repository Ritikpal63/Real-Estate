const ServiceModel = require("../models/serviceModel");
const ServiceQueryModel = require("../models/serviceQueryModel");
const getTransporter = require("../config/mailer");

const escapeHtml = (value) =>
String(value).
replaceAll("&", "&amp;").
replaceAll("<", "&lt;").
replaceAll(">", "&gt;").
replaceAll('"', "&quot;").
replaceAll("'", "&#039;");

class ServiceController {




  static getAll = async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 4;
      const offset = Number(req.query.offset) || 0;

      const services = await ServiceModel.getAll(limit, offset);

      res.status(200).json({
        success: true,
        count: services.length,
        data: services,
        pagination: {
          limit,
          offset
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };





  static getAllServices = async (req, res) => {
    try {
      const services = await ServiceModel.getAllServices();

      res.status(200).json({
        success: true,
        count: services.length,
        data: services
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };




  static getById = async (req, res) => {
    try {
      const service = await ServiceModel.getById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }

      res.status(200).json({
        success: true,
        data: service
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };





  static createService = async (req, res) => {
    try {
      const { title, slug, description, icon, status, display_order } =
      req.body;

      if (!title || !slug) {
        return res.status(400).json({
          success: false,
          message: "Title and slug are required"
        });
      }

      const service = await ServiceModel.create({
        title,
        slug,
        description,
        icon,
        status,
        display_order
      });

      res.status(201).json({
        success: true,

        message: "Service Created Successfully",

        data: service
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };





  static updateService = async (req, res) => {
    try {
      const service = await ServiceModel.getById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }

      await ServiceModel.update(
        req.params.id,

        req.body
      );

      res.status(200).json({
        success: true,

        message: "Service Updated Successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };





  static deleteService = async (req, res) => {
    try {
      const service = await ServiceModel.getById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }

      await ServiceModel.delete(req.params.id);

      res.status(200).json({
        success: true,

        message: "Service Deleted Successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message
      });
    }
  };
  static submitQuery = async (req, res) => {
    try {
      const { serviceId, name, email, contact, message } = req.body;

      if (
      !serviceId ||
      !name?.trim() ||
      !email?.trim() ||
      !contact?.trim() ||
      !message?.trim())
      {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      const cleanName = name.trim();

      const cleanEmail = email.trim().toLowerCase();

      const cleanContact = contact.trim();

      const cleanMessage = message.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }

      const contactRegex = /^[0-9+()\-\s]{7,20}$/;

      if (!contactRegex.test(cleanContact)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid contact number"
        });
      }

      const service = await ServiceModel.getById(serviceId);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }

      const query = await ServiceQueryModel.create({
        serviceId: service.id,
        serviceTitle: service.title,
        name: cleanName,
        email: cleanEmail,
        contact: cleanContact,
        message: cleanMessage
      });

      const adminEmail = process.env.ADMIN_EMAIL;

      if (!adminEmail) {
        await ServiceQueryModel.updateEmailStatus(query.id, "failed");

        return res.status(500).json({
          success: false,
          message: "Admin email is not configured"
        });
      }

      try {
        const mailer = getTransporter();
        const safe = {
          service: escapeHtml(service.title),
          name: escapeHtml(cleanName),
          email: escapeHtml(cleanEmail),
          contact: escapeHtml(cleanContact),
          message: escapeHtml(cleanMessage).replaceAll("\n", "<br>")
        };

        await mailer.sendMail({
          from: process.env.MAIL_FROM || process.env.SMTP_USER,
          to: adminEmail,
          replyTo: cleanEmail,
          subject: `New service enquiry: ${service.title}`,
          text: [
          `Service: ${service.title}`,
          `Name: ${cleanName}`,
          `Email: ${cleanEmail}`,
          `Contact: ${cleanContact}`,
          "",
          "Customer request:",
          cleanMessage].
          join("\n"),
          html: `
            <h2>New service enquiry</h2>
            <p><strong>Service:</strong> ${safe.service}</p>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Contact:</strong> ${safe.contact}</p>
            <p><strong>Customer request:</strong></p>
            <p>${safe.message}</p>
          `
        });

        await ServiceQueryModel.updateEmailStatus(query.id, "sent");
      } catch (emailError) {
        console.error("Service enquiry email error:", emailError.message);

        await ServiceQueryModel.updateEmailStatus(query.id, "failed");

        return res.status(502).json({
          success: false,
          emailSent: false,
          message:
          "We could not email your enquiry right now. Please try again shortly.",
          queryId: query.id
        });
      }

      return res.status(201).json({
        success: true,
        emailSent: true,
        message: "Your enquiry has been sent successfully",
        queryId: query.id
      });
    } catch (error) {
      console.error("Service Query Error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to submit service enquiry"
      });
    }
  };
}

module.exports = ServiceController;
