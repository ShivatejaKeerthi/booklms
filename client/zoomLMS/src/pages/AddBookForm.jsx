import { useState, useEffect } from "react";

const AddBookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Get user info from localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userInfo || userInfo.role !== "admin") {
            setMessage("You are not authorized to add books.");
            return;
        }

        const bookData = { title, author, genre, publicationYear, description };
        
        try {
            const response = await fetch("http://localhost:5000/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}` // Send token
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
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Error adding book:", error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                <input type="number" placeholder="Publication Year" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookForm;
