// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">LMS</h1>
      <div>
        <Link className="mx-2" to="/">Home</Link>
        <Link className="mx-2" to="/books">Books</Link>
        <Link className="mx-2" to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
