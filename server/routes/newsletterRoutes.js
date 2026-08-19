import express from "express";
import { subscribeNewsletter, getAllSubscribers } from "../controllers/newsletterController.js";
const pool = require("../config/database");

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);
router.get("/subscribe", getAllSubscribers)

export default router;
