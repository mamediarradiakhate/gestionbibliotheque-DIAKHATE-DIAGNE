const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.addBook);
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;