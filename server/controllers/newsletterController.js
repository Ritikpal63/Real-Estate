import NewsletterModel from "../models/newsletterModel.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const result = await NewsletterModel.subscribe(normalizedEmail);

    if (result.alreadySubscribed) {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed",
      });
    }

    if (result.reactivated) {
      return res.status(200).json({
        success: true,
        message: "Your newsletter subscription has been reactivated",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to our newsletter",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while subscribing",
    });
  }
};