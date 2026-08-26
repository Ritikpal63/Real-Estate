const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { randomUUID: uuidv4, randomInt } = require("crypto");
const getNovu = require("../config/novu");

class authController {
  static async sendRegisterOtp(req, res) {
    try {
      const { email } = req.body;

      if (!email?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }

      const cleanEmail = email.trim().toLowerCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }

      const [existingUser] = await db.query(
        `
        SELECT id
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [cleanEmail]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "This email is already registered"
        });
      }

      const [existingOtp] = await db.query(
        `
        SELECT
          TIMESTAMPDIFF(
            SECOND,
            last_sent_at,
            NOW()
          ) AS seconds_since_last_sent
        FROM email_otps
        WHERE email = ?
        LIMIT 1
        `,
        [cleanEmail]
      );

      if (
      existingOtp.length > 0 &&
      existingOtp[0].seconds_since_last_sent < 60)
      {
        const remaining = 60 - Number(existingOtp[0].seconds_since_last_sent);

        return res.status(429).json({
          success: false,
          message: `Please wait ${remaining} seconds before requesting another OTP`
        });
      }

      const otp = randomInt(100000, 1000000).toString();

      const otpHash = await bcrypt.hash(otp, 10);

      const otpId = uuidv4();

      await db.query(
        `
        INSERT INTO email_otps
        (
          id,
          email,
          otp_hash,
          attempts,
          expires_at,
          last_sent_at,
          created_at
        )
        VALUES
        (
          ?,
          ?,
          ?,
          0,
          DATE_ADD(NOW(), INTERVAL 5 MINUTE),
          NOW(),
          NOW()
        )

        ON DUPLICATE KEY UPDATE

          id = VALUES(id),
          otp_hash = VALUES(otp_hash),
          attempts = 0,
          expires_at = DATE_ADD(NOW(), INTERVAL 5 MINUTE),
          last_sent_at = NOW()
        `,
        [otpId, cleanEmail, otpHash]
      );

      try {
        const novu = await getNovu();

        await novu.trigger({
          workflowId:
          process.env.NOVU_REGISTER_OTP_WORKFLOW_ID ||
          "registration-email-otp",

          to: {
            subscriberId: `registration-${cleanEmail}`,
            email: cleanEmail
          },

          payload: {
            otp,
            expiresInMinutes: 5
          }
        });
      } catch (novuError) {
        console.error("Novu OTP Email Error:", novuError);

        await db.query(
          `
          DELETE FROM email_otps
          WHERE email = ?
          `,
          [cleanEmail]
        );

        return res.status(500).json({
          success: false,
          message: "Unable to send OTP email"
        });
      }

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to your email"
      });
    } catch (error) {
      console.error("Send OTP Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }

  static async register(req, res) {
    try {
      const { username, name, email, password, contact, category, otp } =
      req.body;

      if (
      !username?.trim() ||
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !contact?.trim() ||
      !category ||
      !otp?.trim())
      {
        return res.status(400).json({
          success: false,
          message: "All fields including OTP are required"
        });
      }

      const cleanUsername = username.trim();
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanContact = contact.trim();
      const cleanOtp = otp.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }

      const contactRegex = /^[6-9]\d{9}$/;

      if (!contactRegex.test(cleanContact)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid 10 digit contact number"
        });
      }

      if (!["Dealer", "Consumer"].includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Category must be Dealer or Consumer"
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long"
        });
      }

      if (!/^\d{6}$/.test(cleanOtp)) {
        return res.status(400).json({
          success: false,
          message: "OTP must be 6 digits"
        });
      }

      const [existingUser] = await db.query(
        `
        SELECT id
        FROM users
        WHERE email = ?
        OR username = ?
        OR contact = ?
        LIMIT 1
        `,
        [cleanEmail, cleanUsername, cleanContact]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User already exists with this email, username or contact"
        });
      }

      const [otpRecords] = await db.query(
        `
        SELECT
          id,
          otp_hash,
          attempts,
          expires_at,
          CASE
            WHEN expires_at <= NOW()
            THEN 1
            ELSE 0
          END AS is_expired
        FROM email_otps
        WHERE email = ?
        LIMIT 1
        `,
        [cleanEmail]
      );

      if (otpRecords.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please request an OTP first"
        });
      }

      const otpRecord = otpRecords[0];

      if (Number(otpRecord.is_expired) === 1) {
        await db.query(
          `
          DELETE FROM email_otps
          WHERE email = ?
          `,
          [cleanEmail]
        );

        return res.status(400).json({
          success: false,
          message: "OTP has expired. Please request a new OTP"
        });
      }

      if (Number(otpRecord.attempts) >= 5) {
        await db.query(
          `
          DELETE FROM email_otps
          WHERE email = ?
          `,
          [cleanEmail]
        );

        return res.status(429).json({
          success: false,
          message: "Too many incorrect OTP attempts. Please request a new OTP"
        });
      }

      const isOtpValid = await bcrypt.compare(cleanOtp, otpRecord.otp_hash);

      if (!isOtpValid) {
        const newAttempts = Number(otpRecord.attempts) + 1;

        if (newAttempts >= 5) {
          await db.query(
            `
            DELETE FROM email_otps
            WHERE email = ?
            `,
            [cleanEmail]
          );

          return res.status(429).json({
            success: false,
            message:
            "Too many incorrect OTP attempts. Please request a new OTP"
          });
        }

        await db.query(
          `
          UPDATE email_otps
          SET attempts = attempts + 1
          WHERE email = ?
          `,
          [cleanEmail]
        );

        return res.status(400).json({
          success: false,
          message: `Invalid OTP. ${5 - newAttempts} attempts remaining`
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = uuidv4();

      const role = "user";

      await db.query(
        `
        INSERT INTO users
        (
          id,
          username,
          name,
          email,
          password,
          contact,
          category,
          role,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `,
        [
        userId,
        cleanUsername,
        cleanName,
        cleanEmail,
        hashedPassword,
        cleanContact,
        category,
        role]

      );

      await db.query(
        `
        DELETE FROM email_otps
        WHERE email = ?
        `,
        [cleanEmail]
      );

      return res.status(201).json({
        success: true,
        message: "Email verified and registration successful",

        user: {
          id: userId,
          username: cleanUsername,
          name: cleanName,
          email: cleanEmail,
          contact: cleanContact,
          category,
          role
        }
      });
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "Email, username or contact already exists"
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email?.trim() || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }

      const cleanEmail = email.trim().toLowerCase();

      const [users] = await db.query(
        `
        SELECT *
        FROM users
        WHERE email = ?
        LIMIT 1
        `,
        [cleanEmail]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const user = users[0];

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

      const { password: _, ...userWithoutPassword } = user;

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Login Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;

      const [users] = await db.query(
        `
        SELECT
          id,
          username,
          name,
          email,
          contact,
          category,
          role,
          created_at
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [userId]
      );

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.status(200).json({
        success: true,
        user: users[0]
      });
    } catch (error) {
      console.error("Get Current User Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
}

module.exports = authController;
