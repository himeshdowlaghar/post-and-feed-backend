const mongoose = require("mongoose");

// create schema
const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
});

// create model
const postModel = mongoose.model("post", postSchema);

module.exports = postModel;

