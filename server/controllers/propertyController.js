const PropertyModel = require('../models/propertyModel');
const fs = require("fs");
const pool = require('../config/database')
const path = require("path");

class PropertyController{


static getAllProperties = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM properties ORDER BY id DESC"
    );

    const data = rows.map((row) => ({
      ...row,
      image: row.image
        ? `${req.protocol}://${req.get("host")}/uploads/${row.image}`
        : null,
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error("getAllProperties error:", err);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

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
      image: rows[0].image
        ? `${req.protocol}://${req.get("host")}/uploads/${rows[0].image}`
        : null,
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

    const image = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      `INSERT INTO properties
        (title, location, type, amenities, size, year, bedroom, bathroom, description, image, price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ]
    );

    res.status(201).json({
      message: "Property created successfully",
      id: result.insertId,
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
      [id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    let image = existingRows[0].image;

    if (req.file) {
      if (image) {
        const oldPath = path.join(__dirname, "..", "uploads", image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = req.file.filename;
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
      ]
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
      [id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    const image = existingRows[0].image;
    if (image) {
      const imagePath = path.join(__dirname, "..", "uploads", image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await pool.query("DELETE FROM properties WHERE id = ?", [id]);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error("deleteProperty error:", err);
    res.status(500).json({ message: "Failed to delete property" });
  }
};
}

module.exports = PropertyController