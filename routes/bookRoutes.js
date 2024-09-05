const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();
// url on the root
router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

// operations based on id
router
  .route("/:id")
  .get(bookController.getBook)
  .put(bookController.updateBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
