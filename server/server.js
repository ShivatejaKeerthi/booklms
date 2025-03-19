import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/books',bookRoutes);

app.get('/',(req,res)=>res.send(`Library Management System API`));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`));