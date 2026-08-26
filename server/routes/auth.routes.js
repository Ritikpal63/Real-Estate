const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const { authenticate } = require("../middleware/auth");

router.post("/send-register-otp", authController.sendRegisterOtp);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", authenticate, authController.getCurrentUser);

module.exports = router;
