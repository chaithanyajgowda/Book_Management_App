// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String  // <-- URL or base64 string
});

module.exports = mongoose.model('Book', bookSchema);

