const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({
  name: String,
  url: String,
  description: String,
  visited: { type: Boolean, default: false }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
