
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();



app.use(
  cors({
    origin: [
     process.env.CLIENT_URL,
      "http://localhost:5173",
    ].filter(Boolean),
    credentials: true,
  }),
);


const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/property", propertyRoutes);

const newsRoutes = require("./routes/newsRoutes");
app.use("/api/news", newsRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const teamRoutes = require("./routes/teamRoutes");
app.use("/api/team", teamRoutes);

const galleryRoutes = require("./routes/galleryRoutes");
app.use("/api/gallery", galleryRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);


const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// Error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;
