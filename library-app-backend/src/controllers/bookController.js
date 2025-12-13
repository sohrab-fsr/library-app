import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, year, genre } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        status: "error",
        error: { message: "Title and author are required" }
      });
    }

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      year,
      genre,
      createdBy: req.user._id
    });

    return res.status(201).json({
      status: "ok",
      data: book
    });
  } catch (err) {
    console.error("Create book error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error while creating book" }
    });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.json({
      status: "ok",
      data: books
    });
  } catch (err) {
    console.error("Get books error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error while fetching books" }
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id, createdBy: req.user._id });

    if (!book) {
      return res.status(404).json({
        status: "error",
        error: { message: "Book not found" }
      });
    }

    return res.json({
      status: "ok",
      data: book
    });
  } catch (err) {
    console.error("Get book by id error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error while fetching book" }
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const book = await Book.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      updates,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        status: "error",
        error: { message: "Book not found" }
      });
    }

    return res.json({
      status: "ok",
      data: book
    });
  } catch (err) {
    console.error("Update book error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error while updating book" }
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findOneAndDelete({ _id: id, createdBy: req.user._id });

    if (!result) {
      return res.status(404).json({
        status: "error",
        error: { message: "Book not found" }
      });
    }

    return res.json({
      status: "ok",
      data: { deleted: true }
    });
  } catch (err) {
    console.error("Delete book error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error while deleting book" }
    });
  }
};
