// server/app.js
// app.js ke top me
const { sequelize } = require("./models");


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
sequelize
  .sync()
  .then(() => console.log("✅ All tables synced (auto-created if missing)"))
  .catch((err) => console.error("❌ Sequelize sync error:", err));

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.CLIENT_URL, // set this in Vercel env vars to your prod domain
// ].filter(Boolean);

app.use(
  cors({
    origin: [
     process.env.CLIENT_URL,
      "http://localhost:5173",
    ].filter(Boolean),
    credentials: true,
  }),
);

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   }),
// );
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




// Routes



const contactRoutes = require('./routes/contactRoutes')
app.use('/api/contact', contactRoutes)

const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/property', propertyRoutes)

const newsRoutes = require("./routes/newsRoutes");
app.use("/api/news", newsRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const teamRoutes = require('./routes/teamRoutes');
app.use('/api/team', teamRoutes)

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
