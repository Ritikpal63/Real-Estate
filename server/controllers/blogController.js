const BlogModel = require("../models/blogModel");
class BlogController {
  static async postBlog(req, res) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ success: false, message: "Title and content are required" });
      }
      const imageUrl = req.file.path;

      const newBlog = await BlogModel.create({ title, content, imageUrl });
      return res.status(201).json({ success: true, data: newBlog });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getAllBlogs(req, res) {
    try {
      const blogs = await BlogModel.getAll();
      const total = await BlogModel.getCount();
      return res.status(200).json({ success: true, data: blogs, pagination: { total } });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getByIdBlog(req, res) {
    try {
      const { id } = req.params;
      const blog = await BlogModel.getById(id);
      
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }
      
      res.json({ success: true, data: blog });
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch blog', error: error.message });
    }
  }
    static async deleteBlog(req, res) {
    try {
      const { id } = req.params;
      
      const existing = await BlogModel.getById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }
      
      await BlogModel.delete(id);
      
      res.json({ 
        success: true, 
        message: 'Blog deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ success: false, message: 'Failed to delete blog', error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      
      // Check if news exists
      const existing = await BlogModel.getById(id);
      const imageUrl = req.file ? req.file.path : existing.image; 
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }
      
      // Validation
      if (!title || !content) {
        return res.status(400).json({ 
          success: false, 
          message: 'Title and content are required' 
        });
      }
      
      const updated = await BlogModel.update(id, {
        title,
        content,
        imageUrl
      });
      
      res.json({ 
        success: true, 
        message: 'Blog updated successfully',
        data: updated 
      });
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ success: false, message: 'Failed to update blogs', error: error.message });
    }
  }
}

module.exports = BlogController;
