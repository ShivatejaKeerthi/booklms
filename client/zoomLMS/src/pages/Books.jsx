import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title"); 
  const [expandedBookId, setExpandedBookId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://booklms.onrender.com/api/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort books based on selected sort option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "author") {
      return a.author.localeCompare(b.author);
    }
    return 0;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort selection change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Toggle book details view
  const toggleBookDetails = (bookId) => {
    setExpandedBookId(expandedBookId === bookId ? null : bookId);
  };

  if (loading) {
    return <div className="books-loading">Loading books...</div>;
  }

  if (error) {
    return <div className="books-error">{error}</div>;
  }

  return (
    <div className="books-container">
      <h2 className="books-title">Featured Book Collection</h2>
      
      <div className="books-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="sort-box">
          <label htmlFor="sort-select">Sort by: </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>

      {sortedBooks.length === 0 ? (
        <p className="no-books">No books found. Try a different search term.</p>
      ) : (
        <div className="books-grid">
          {sortedBooks.map((book) => (
            <div key={book._id} className="book-card">
              <div className="book-cover">
                {book.coverImage ? (
                  <img src={book.coverImage} alt={`${book.title} cover`} />
                ) : (
                  <div className="book-cover-placeholder">
                    <span>{book.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                
                {expandedBookId === book._id ? (
                  <div className="book-expanded-content">
                    <p className="book-description">{book.description || "No description available."}</p>
                    <div className="book-metadata">
                      {book.publishedYear && (
                        <p className="book-year">
                          <span className="metadata-label">Published:</span> {book.publishedYear}
                        </p>
                      )}
                      {book.pages && (
                        <p className="book-pages">
                          <span className="metadata-label">Pages:</span> {book.pages}
                        </p>
                      )}
                      {book.isbn && (
                        <p className="book-isbn">
                          <span className="metadata-label">ISBN:</span> {book.isbn}
                        </p>
                      )}
                    </div>
                    <button 
                      className="view-details-btn active"
                      onClick={() => toggleBookDetails(book._id)}
                    >
                      Hide Details
                    </button>
                  </div>
                ) : (
                  <>
                    {book.genre && <p className="book-genre">{book.genre}</p>}
                    <div className="view-details-wrapper">
                      <button 
                        className="view-details-btn"
                        onClick={() => toggleBookDetails(book._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;