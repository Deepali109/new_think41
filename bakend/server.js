// HrKKBh45as3RSCYW csdeepalisahu
// mongodb+srv://csdeepalisahu:HrKKBh45as3RSCYW@cluster0.ntz5u4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// server.js or index.js
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config(); // Load MONGO_URI from .env

const app = express();
const PORT = 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
