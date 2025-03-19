import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useUser } from "../context/UserContext"; 
import "../styles/Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Only handle dark mode in useEffect, user data is managed by UserContext
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
  }, []); // No dependencies needed since we're not using setUser anymore

  const handleLogout = () => {
    // Use the logout function from context instead of direct localStorage manipulation
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo" onClick={closeMenu}>📒BookLMS</Link>
        
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/books" className="nav-link" onClick={closeMenu}>Books</Link>
          {user?.role === "admin" && (
            <Link to="/admin/add-book" className="nav-link" onClick={closeMenu}>Add Book</Link>
          )}
        </nav>
        
        <div className={`right ${isMenuOpen ? 'right-active' : ''}`}>
          <button 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {user ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login" className="login-btn" onClick={closeMenu}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 