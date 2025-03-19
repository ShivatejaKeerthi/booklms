import Book from '../models/Book.js';

// Fetch all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({}); // ✅ Fixed: Added 'await'
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch a single book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book Not Found" });
        }
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Add a new book
const addBook = async (req, res) => {
    try {
        const { title, author, genre, publicationYear, description } = req.body;

        // Validate required fields
        if (!title || !author || !genre || !publicationYear || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const book = new Book({ title, author, genre, publicationYear, description });

        const savedBook = await book.save();
        res.status(201).json({ message: "Book Saved to DB Successfully!!", savedBook });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export { getBooks, getBookById, addBook };
