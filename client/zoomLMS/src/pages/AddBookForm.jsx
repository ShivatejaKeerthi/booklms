import { useState, useEffect } from "react";
import '../styles/AddBookForm.css';

const AddBookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    // Parse user info safely
    const storedUserInfo = localStorage.getItem("booklmsUser");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    console.log("User Info:", userInfo); // Debugging log

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userInfo || !userInfo.role || userInfo.role !== "admin") {
            setMessage("You are not authorized to add books.");
            return;
        }

        const bookData = { title, author, genre, publicationYear, description };

        try {
            const response = await fetch("https://booklms.onrender.com/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}` // Ensure token is sent
                },
                body: JSON.stringify(bookData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Book added successfully!");
                setTitle("");
                setAuthor("");
                setGenre("");
                setPublicationYear("");
                setDescription("");
            } else {
                setMessage(data.message || "Failed to add book.");
            }
        } catch (error) {
            console.error("Error adding book:", error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <div className="add-book-container">
            <h2 className="add-book-title">Add a New Book</h2>
            {message && <p className={`message ${message.includes("successfully") ? "success-message" : "error-message"}`}>{message}</p>}
            <form className="book-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input className="form-control" type="number" placeholder="Publication Year" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} required />
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button className="submit-btn" type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookForm; 