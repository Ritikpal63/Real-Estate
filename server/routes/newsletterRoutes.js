const express = require("express");

const {
  subscribeNewsletter,
  getAllSubscriber,
} = require("../controllers/newsletterController");

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);
router.get("/subscriber", getAllSubscriber);

module.exports = router;
