import express from 'express';
import { getBooks, getBookById, addBook, addMultipleBooks } from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', protect, admin, addBook);


router.post('/add-multiple', protect, admin, addMultipleBooks);

export default router;
