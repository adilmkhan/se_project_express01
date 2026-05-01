const mongoose = require("mongoose");
const validator = require("validator");

const newsItemSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    // maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    // maxlength: 30,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "You must enter a valid URL",
    },
  },
  publishedAt: {
    type: Date,
  },
  source: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  keyword: {
    type: String,
    minlength: 2,
    // maxlength: 30,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("newsItem", newsItemSchema);
