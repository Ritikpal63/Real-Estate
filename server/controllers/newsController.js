// controllers/newsController.js
const NewsModel = require('../models/newsModel');



class NewsController {
  // Get all news
  static async getAll(req, res) {
    try {
      const { limit = 3, offset = 0 } = req.query;
      const news = await NewsModel.getAll(parseInt(limit), parseInt(offset));
      const total = await NewsModel.getCount();
      
      res.json({
        success: true,
        data: news,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch news', error: error.message });
    }
  }

  // Get single news
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const news = await NewsModel.getById(id);
      
      if (!news) {
        return res.status(404).json({ success: false, message: 'News not found' });
      }
      
      res.json({ success: true, data: news });
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch news', error: error.message });
    }
  }

  
  static async getAllNews(req, res) {
    try {
      // const { limit = 10, offset = 0 } = req.query;
      const news = await NewsModel.getAll();
      const total = await NewsModel.getCount();
      
      res.json({
        success: true,
        data: news,
        pagination: {
          total,
        }
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch news', error: error.message });
    }
  }

  // Create news
  static async create(req, res) {
    try {
      const { title, content, summary, category, image, author } = req.body;
      
      // Validation
      if (!title || !content) {
        return res.status(400).json({ 
          success: false, 
          message: 'Title and content are required' 
        });
      }

      
      const newNews = await NewsModel.create({
        title,
        content,
        summary,
        category,
        image,
        author: author || req.user?.username || 'Admin'
      });
      
      res.status(201).json({ 
        success: true, 
        message: 'News created successfully',
        data: newNews 
      });
    } catch (error) {
      console.error('Error creating news:', error);
      res.status(500).json({ success: false, message: 'Failed to create news', error: error.message });
    }
  }

  // Update news
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content, summary, category, image, author } = req.body;
      
      // Check if news exists
      const existing = await NewsModel.getById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'News not found' });
      }
      
      // Validation
      if (!title || !content) {
        return res.status(400).json({ 
          success: false, 
          message: 'Title and content are required' 
        });
      }
      
      const updated = await NewsModel.update(id, {
        title,
        content,
        summary,
        category,
        image,
        author: author || existing.author
      });
      
      res.json({ 
        success: true, 
        message: 'News updated successfully',
        data: updated 
      });
    } catch (error) {
      console.error('Error updating news:', error);
      res.status(500).json({ success: false, message: 'Failed to update news', error: error.message });
    }
  }

  // Delete news
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      // Check if news exists
      const existing = await NewsModel.getById(id);
      console.log("Existing News", existing)
      if (!existing) {
        return res.status(404).json({ success: false, message: 'News not found' });
      }
      
      await NewsModel.delete(id);
      
      res.json({ 
        success: true, 
        message: 'News deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting news:', error);
      res.status(500).json({ success: false, message: 'Failed to delete news', error: error.message });
    }
  }

  // Get news by category
  static async getByCategory(req, res) {
    try {
      const { category } = req.params;
      const { limit = 20 } = req.query;
      
      const news = await NewsModel.getByCategory(category, parseInt(limit));
      
      res.json({ 
        success: true, 
        data: news,
        count: news.length
      });
    } catch (error) {
      console.error('Error fetching news by category:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch news', error: error.message });
    }
  }

  // Search news
  static async search(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({ 
          success: false, 
          message: 'Search keyword is required' 
        });
      }
      
      const news = await NewsModel.search(q);
      
      res.json({ 
        success: true, 
        data: news,
        count: news.length
      });
    } catch (error) {
      console.error('Error searching news:', error);
      res.status(500).json({ success: false, message: 'Failed to search news', error: error.message });
    }
  }

  // Get latest news
  static async getLatest(req, res) {
    try {
      const { limit = 5 } = req.query;
      const news = await NewsModel.getLatest(parseInt(limit));
      
      res.json({ 
        success: true, 
        data: news 
      });
    } catch (error) {
      console.error('Error fetching latest news:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch latest news', error: error.message });
    }
  }
}

module.exports = NewsController;