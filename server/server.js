import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB connection error:', err.message));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Crema & Co. API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
