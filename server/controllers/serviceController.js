const ServiceModel = require("../models/serviceModel");

class ServiceController {
  // ===================================
  // Get Services (Pagination)
  // Home Page / Listing
  // ===================================
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
          offset,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ===================================
  // Get All Services
  // Services Page
  // ===================================
  static getAllServices = async (req, res) => {
    try {
      const services = await ServiceModel.getAllServices();

      res.status(200).json({
        success: true,
        count: services.length,
        data: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ===================================
  // Get Single Service
  // ===================================
  static getById = async (req, res) => {
    try {
      const service = await ServiceModel.getById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ===================================
  // Create Service
  // Admin
  // ===================================
  static createService = async (req, res) => {
    try {
      const { title, slug, description, icon, status, display_order } =
        req.body;

      if (!title || !slug) {
        return res.status(400).json({
          success: false,
          message: "Title and slug are required",
        });
      }

      const service = await ServiceModel.create({
        title,
        slug,
        description,
        icon,
        status,
        display_order,
      });

      res.status(201).json({
        success: true,

        message: "Service Created Successfully",

        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ===================================
  // Update Service
  // Admin
  // ===================================
  static updateService = async (req, res) => {
    try {
      const service = await ServiceModel.getById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      await ServiceModel.update(
        req.params.id,

        req.body,
      );

      res.status(200).json({
        success: true,

        message: "Service Updated Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ===================================
  // Delete Service
  // Admin
  // ===================================
  static deleteService = async (req, res) => {
    try {
      const service = await ServiceModel.getById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      await ServiceModel.delete(req.params.id);

      res.status(200).json({
        success: true,

        message: "Service Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };
}

module.exports = ServiceController;
