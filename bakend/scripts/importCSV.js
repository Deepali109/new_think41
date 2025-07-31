const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config(); // Load MONGO_URI from .env

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    importCSV();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

function importCSV() {
  const results = [];

  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (row) => {
      row.id = parseInt(row.id);
      row.cost = parseFloat(row.cost);
      row.retail_price = parseFloat(row.retail_price);
      row.distribution_center_id = parseInt(row.distribution_center_id);
      results.push(row);
    })
    .on("end", async () => {
      try {
        await Product.insertMany(results);
        console.log("✅ Products inserted successfully!");
      } catch (err) {
        console.error("❌ Error inserting products:", err);
      } finally {
        mongoose.disconnect();
      }
    });
}
