import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function BooksPage() {
  const { user, token, apiBaseUrl } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState("create"); // "create" or "edit"
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchBooks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiBaseUrl}/api/books`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error("Failed to load books");
      }
      const json = await res.json();
      setBooks(json.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error loading books");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormMode("create");
    setCurrentId(null);
    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title || !author) {
      setError("Title and author are required.");
      return;
    }
    try {
      const payload = {
        title,
        author,
        year: year ? Number(year) : undefined,
        genre: genre || undefined
      };
      let url = `${apiBaseUrl}/api/books`;
      let method = "POST";
      if (formMode === "edit" && currentId) {
        url = `${apiBaseUrl}/api/books/${currentId}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error("Failed to save book");
      }
      await fetchBooks();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || "Error saving book");
    }
  }

  function handleEdit(book) {
    setFormMode("edit");
    setCurrentId(book._id);
    setTitle(book.title || "");
    setAuthor(book.author || "");
    setYear(book.year ? String(book.year) : "");
    setGenre(book.genre || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;
    try {
      const res = await fetch(`${apiBaseUrl}/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error("Failed to delete book");
      }
      await fetchBooks();
    } catch (err) {
      console.error(err);
      setError(err.message || "Error deleting book");
    }
  }

  return (
    <div className="page-card">
      <h2 className="page-title">My Books</h2>
      <p className="page-subtitle">
        Manage the books in your personal library. You can create, view, update,
        and delete books from this page.
      </p>

      {/* Book form */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="year">Year (optional)</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="genre">Genre (optional)</label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        {error && <div className="error-text">{error}</div>}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
          <button className="btn btn-primary" type="submit">
            {formMode === "create" ? "Add Book" : "Save Changes"}
          </button>
          {formMode === "edit" && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Books list */}
      <div style={{ marginTop: "1.25rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>
          Books in your library
        </h3>
        {loading ? (
          <p className="books-empty">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="books-empty">
            You don&apos;t have any books yet. Use the form above to add your
            first book.
          </p>
        ) : (
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year || "-"}</td>
                  <td>{book.genre || "-"}</td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      type="button"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BooksPage;
