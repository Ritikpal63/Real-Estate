// backend/controllers/auth.controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const crypto = require("crypto");

class authController {
  static async register(req, res) {
    try {
      const { username, name, email, password } = req.body;

      console.log("📝 Registration attempt for:", email);

      // Validate input
      if (!username || !name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check existing user
      const [existingUser] = await db.query(
        "SELECT id FROM users WHERE email = ? OR username = ?",
        [email, username],
      );

      if (existingUser.length > 0) {
        console.log("❌ User already exists:", email);

        return res.status(409).json({
          success: false,
          message: "User already exists with this email or username",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate UUID in Node.js
      const userId = crypto.randomUUID();

      // Insert user
      await db.query(
        `INSERT INTO users
      (id, username, name, email, password, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [userId, username, name, email, hashedPassword, "user"],
      );

      console.log("✅ User registered successfully:", email);

      // Generate JWT
      const token = jwt.sign(
        {
          id: userId,
          email: email,
          role: "user",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.status(201).json({
        success: true,
        message: "Registration successful!",
        token,
        user: {
          id: userId,
          username,
          name,
          email,
          role: "user",
        },
      });
    } catch (error) {
      console.error("❌ Registration error:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // ===============================
  // Login user
  // ===============================
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      console.log("🔐 Login attempt for:", email);

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Find user
      const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (users.length === 0) {
        console.log("❌ User not found:", email);

        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const user = users[0];

      // Compare password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        console.log("❌ Invalid password for:", email);

        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Generate JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );

      console.log("✅ Login successful for:", email);

      // Remove password
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // HTTPS required
        sameSite: "none", // Cross-origin ke liye
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        token,
      });
    } catch (error) {
      console.error("❌ Login error:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // ===============================
  // Get current user
  // ===============================
  static async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;

      const [users] = await db.query(
        `SELECT
        id,
        username,
        name,
        email,
        role,
        created_at
       FROM users
       WHERE id = ?`,
        [userId],
      );

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        user: users[0],
      });
    } catch (error) {
      console.error("❌ Error getting user:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = authController;
