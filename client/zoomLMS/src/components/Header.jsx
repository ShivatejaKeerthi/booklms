import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../styles/Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser);

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  return (
    <header className="header">
      <div className="container">
        
        <Link to="/" className="logo">📒BookLMS</Link>

        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/books" className="nav-link">Books</Link>
          {user?.role === "admin" && (
            <Link to="/admin/add-book" className="nav-link">Add Book</Link>
          )}
        </nav>

        
        <div className="right">
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {user ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
