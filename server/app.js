// server/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // set this in Vercel env vars to your prod domain
].filter(Boolean);

app.use(
  cors({
    origin: [
      "https://real-estate-sand-five.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   }),
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const newsRoutes = require("./routes/newsRoutes");
app.use("/api/news", newsRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Server is running' });
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;
