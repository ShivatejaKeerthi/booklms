import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("https://booklms.onrender.com/api/books");
        console.log("Fetched Books:", data);
        setBooks(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

 
  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(search.toLowerCase()) ||
    book.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      
      <div className="hero">
        <h1>Discover Your Next Favorite Book</h1>
        <p>Explore a wide range of books and dive into knowledge.</p>

        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={search}
            onChange={handleSearchChange}
            className="search-bar"
          />
          {search && (
            <button 
              className="clear-search" 
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        
        {search && !loading && (
          <p className="search-status">
            Found {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} matching "{search}"
          </p>
        )}

        
        {isAdmin && (
          <Link to="/admin/add-book" className="add-book-btn">
            + Add New Book
          </Link>
        )}
      </div>

      
      <div className="book-list">
        {loading ? (
          <p className="loading">Loading books...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-card" key={book._id}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Year:</strong> {book.publicationYear}</p>
              <div className="view-details-wrapper">
                <Link to={`/book/${book._id}`} className="view-details">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-books">
            {search ? `No books matching "${search}" found.` : "No books available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home; 