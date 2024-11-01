import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/mongodb';
import authRoutes from './routes/auth';
import gameRoutes from './routes/game';
import adminRoutes from './routes/admin';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Configure CORS for frontend
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 5173;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});