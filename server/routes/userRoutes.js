import express from 'express';
import { registerUser, loginUser, makeAdmin } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/make-admin', protect, admin, makeAdmin);

export default router;
