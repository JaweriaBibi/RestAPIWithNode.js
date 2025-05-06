const mongoose = require("mongoose");

// const url = process.env.MONGO_URI;

const connectDB = (url) => {
  console.log("Connecting to MongoDB...");
  return mongoose.connect(url);
};

module.exports = connectDB;
