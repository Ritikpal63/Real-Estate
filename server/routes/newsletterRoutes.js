import express from "express";
import { subscribeNewsletter } from "../controllers/newsletterController.js";
const pool = require("../config/database");

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);
router.get('/subscribe', (req,res)=>{
    const [rows] = await pool.query(
      "SELECT * FROM newsletter_subscribers",
    );
    res.json({ success: true, data: rows });
})

export default router;
