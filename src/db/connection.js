const mongoose = require("mongoose");

// create connection
async function createDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the Database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

module.exports = createDB;