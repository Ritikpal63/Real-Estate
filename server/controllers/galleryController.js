const GalleryModel = require("../models/galleryModel");
const { toDisplayImageUrl } = require("../utils/imageUrl");

const withFullImageUrl = (req, item) => ({
  ...item,
  image: toDisplayImageUrl(req, item.image)
});

class GalleryController {
  static getAll = async (req, res) => {
    try {
      const items = await GalleryModel.getAll();
      res.status(200).json({ success: true, data: items.map((item) => withFullImageUrl(req, item)) });
    } catch (err) {
      console.error("getAll gallery error:", err);
      res.status(500).json({ success: false, message: "Failed to fetch gallery" });
    }
  };

  static getByCategory = async (req, res) => {
    try {
      const items = await GalleryModel.getByCategory(req.params.category);
      res.status(200).json({ success: true, data: items.map((item) => withFullImageUrl(req, item)) });
    } catch (err) {
      console.error("getByCategory gallery error:", err);
      res.status(500).json({ success: false, message: "Failed to fetch gallery" });
    }
  };

  static getById = async (req, res) => {
    try {
      const item = await GalleryModel.getById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: "Gallery item not found" });
      res.status(200).json({ success: true, data: withFullImageUrl(req, item) });
    } catch (err) {
      console.error("getById gallery error:", err);
      res.status(500).json({ success: false, message: "Failed to fetch gallery item" });
    }
  };

  static create = async (req, res) => {
    try {
      const { title, category, description } = req.body;
      if (!title) return res.status(400).json({ success: false, message: "Title is required" });
      if (!req.file) return res.status(400).json({ success: false, message: "Image is required" });

      const image = req.file.path;
      const item = await GalleryModel.create({ title, category: category || "bedroom", image, description });

      res.status(201).json({ success: true, message: "Gallery item created", data: withFullImageUrl(req, item) });
    } catch (err) {
      console.error("create gallery error:", err);
      res.status(500).json({ success: false, message: "Failed to create gallery item" });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, category, description } = req.body;

      const existing = await GalleryModel.getById(id);
      if (!existing) return res.status(404).json({ success: false, message: "Gallery item not found" });

      let image = existing.image;
      if (req.file) image = req.file.path;

      const updated = await GalleryModel.update(id, {
        title: title || existing.title,
        category: category || existing.category,
        image,
        description: description ?? existing.description
      });

      res.status(200).json({ success: true, message: "Gallery item updated", data: withFullImageUrl(req, updated) });
    } catch (err) {
      console.error("update gallery error:", err);
      res.status(500).json({ success: false, message: "Failed to update gallery item" });
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const existing = await GalleryModel.getById(id);
      if (!existing) return res.status(404).json({ success: false, message: "Gallery item not found" });

      await GalleryModel.delete(id);
      res.status(200).json({ success: true, message: "Gallery item deleted" });
    } catch (err) {
      console.error("delete gallery error:", err);
      res.status(500).json({ success: false, message: "Failed to delete gallery item" });
    }
  };
}
module.exports = GalleryController;
