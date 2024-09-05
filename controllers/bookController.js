const Book = require("../models/bookModel");
const APIFeatures = require("./../utils/apiFeature");

// create a book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// get all bookss
exports.getAllBooks = async (req, res) => {
  try {
    const features = new APIFeatures(Book.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const books = await features.query;

    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get book by id
exports.getBook = async (req, res) => {
  // console.log(req.body)
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "No book found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update a book
exports.updateBook = async (req, res) => {
  try {
    // price should be non-negative
    if (req.body.price < 0) {
      return res.status(400).json({
        status: "fail",
        message: "Price cannot be negative.",
      });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // validators are run for the updated fields to ensure correctness
    });

    // edge case where the book does not exist
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "No book found with that ID.",
      });
    }

    //sucucess
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "No book found with that ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
