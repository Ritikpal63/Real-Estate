const PropertyModel = require("../models/propertyModel");
const pool = require("../config/database");
const { toDisplayImageUrl } = require("../utils/imageUrl");

class PropertyController {
  static getAllProperties = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const offset = (page - 1) * limit;

      const [rows] = await pool.query(
        "SELECT * FROM properties ORDER BY id DESC LIMIT ? OFFSET ?",
        [limit, offset],
      );

      const data = rows.map((row) => ({
        ...row,
        image: toDisplayImageUrl(req, row.image),
      }));

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("getAllProperties error:", err);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  };
  static async getAll(req, res) {
    try {
      const {limit , offset} = req.query;
      const data = await PropertyModel.getAll(parseInt(limit), parseInt(offset));
      const total = await PropertyModel.getCount();

      res.json({
        success: true,
        data: data,
        pagination: {
          total,
        },
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch properties",
        error: error.message,
      });
    }
  }

  static getPropertyById = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM properties WHERE id = ?", [
        id,
      ]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      const property = {
        ...rows[0],
        image: toDisplayImageUrl(req, rows[0].image),
      };

      res.status(200).json(property);
    } catch (err) {
      console.error("getPropertyById error:", err);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  };

  static createProperty = async (req, res) => {
    try {
      const {
        title,
        location,
        type,
        amenities,
        size,
        year,
        bedroom,
        bathroom,
        description,
        price,
      } = req.body;

      if (!title || !location || !type) {
        return res
          .status(400)
          .json({ message: "Title, location and type are required" });
      }

      // With CloudinaryStorage: req.file.path = full secure URL, req.file.filename = public_id
      const image = req.file ? req.file.path : null;

      const property = await PropertyModel.createProperty(
        title,
        location,
        type,
        amenities || null,
        size || null,
        year || null,
        bedroom || 0,
        bathroom || 0,
        description || null,
        image,
        price || 0,
      );

      res.status(201).json({
        message: "Property created successfully",
        id: property.id,
        property: {
          ...property,
          image: toDisplayImageUrl(req, property.image),
        },
      });
    } catch (err) {
      console.error("createProperty error:", err);
      res.status(500).json({ message: "Failed to create property" });
    }
  };

  static updateProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        location,
        type,
        amenities,
        size,
        year,
        bedroom,
        bathroom,
        description,
        price,
      } = req.body;

      const [existingRows] = await pool.query(
        "SELECT * FROM properties WHERE id = ?",
        [id],
      );
      if (existingRows.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      // Cloudinary-hosted images don't need local fs cleanup — just swap the stored URL
      let image = existingRows[0].image;
      if (req.file) {
        image = req.file.path;
      }

      await pool.query(
        `UPDATE properties SET
        title = ?, location = ?, type = ?, amenities = ?, size = ?,
        year = ?, bedroom = ?, bathroom = ?, description = ?, image = ?, price = ?
       WHERE id = ?`,
        [
          title,
          location,
          type,
          amenities || null,
          size || null,
          year || null,
          bedroom || 0,
          bathroom || 0,
          description || null,
          image,
          price || 0,
          id,
        ],
      );

      res.status(200).json({ message: "Property updated successfully" });
    } catch (err) {
      console.error("updateProperty error:", err);
      res.status(500).json({ message: "Failed to update property" });
    }
  };

  static deleteProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const [existingRows] = await pool.query(
        "SELECT * FROM properties WHERE id = ?",
        [id],
      );

      if (existingRows.length === 0) {
        return res.status(404).json({ message: "Property not found" });
      }

      await pool.query("DELETE FROM properties WHERE id = ?", [id]);

      res.status(200).json({ message: "Property deleted successfully" });
    } catch (err) {
      console.error("deleteProperty error:", err);
      res.status(500).json({ message: "Failed to delete property" });
    }
  };
}

module.exports = PropertyController;
