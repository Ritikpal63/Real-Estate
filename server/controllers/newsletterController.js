import {
  findSubscriberByEmail,
  createSubscriber,
  reactivateSubscriber,
} from "../models/newsletterModel.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const existingSubscriber =
      await findSubscriberByEmail(normalizedEmail);

    if (existingSubscriber?.status === "active") {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed",
      });
    }

    if (existingSubscriber?.status === "unsubscribed") {
      await reactivateSubscriber(normalizedEmail);

      return res.status(200).json({
        success: true,
        message: "Newsletter subscription reactivated successfully",
      });
    }

    // New subscriber
    await createSubscriber(normalizedEmail);

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to our newsletter",
    });
  } catch (error) {
    console.error("Subscribe newsletter error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};