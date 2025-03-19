// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBookForm from "./pages/AddBookForm";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo"); // ✅ Fix: Use the correct key
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login setUser={setUser} />} /> {/* ✅ Pass setUser */}
        <Route path="/register" element={<Register setUser={setUser} />} /> {/* ✅ Pass setUser */}
        <Route 
          path="/admin/add-book" 
          element={user && user.role === "admin" ? <AddBookForm /> : <Navigate to="/login" />} // ✅ Fix: Use AddBookForm
        />
      </Routes>
    </Router>
  );
}

export default App;
