const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a title"],
    trim: true,
    unique: true,
  },
  author: {
    type: String,
    required: [true, "A book must have an author"],
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  publishedDate: {
    type: Date,
  },
  price: {
    type: Number,
    required: [true, "A book must have a price"],
    min: [0, "Price must be positive"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
