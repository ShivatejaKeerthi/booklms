import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBookForm from "./pages/AddBookForm";
import Header from "./components/Header";
import { UserProvider } from "./context/UserContext";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <UserProvider> 
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/admin/add-book" 
            element={
              <ProtectedAdminRoute>
                <AddBookForm />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
        <Footer/>
      </Router>
    </UserProvider>
  );
}

export default App;
