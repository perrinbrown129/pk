const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({
  name: String,
  url: String
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
