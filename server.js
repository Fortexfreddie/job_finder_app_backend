import express from 'express';        // Import Express framework
import mongoose from 'mongoose';      // Import Mongoose for MongoDB
import dotenv from 'dotenv';          // Import dotenv for environment variables
import cors from 'cors';              // Import CORS for cross-origin requests
import authRoutes from './routes/authRoutes.js'; // Import auth routes

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors());         // Enable CORS for all routes

// Routes
app.use('/api/auth', authRoutes); // All auth-related routes start with /api/auth

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    
    // Start server once DB is ready
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('DB connection error:', err));