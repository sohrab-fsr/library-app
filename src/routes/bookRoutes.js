import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";

const router = express.Router();

// All book routes require authentication
router.use(authMiddleware);

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
