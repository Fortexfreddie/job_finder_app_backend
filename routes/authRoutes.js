import express from 'express';                 // Import Express
import { signup, login } from '../controllers/authController.js'; // Import controller functions
import authMiddleware from '../middleware/authMiddleware.js';    // Import middleware (for protected routes)

const router = express.Router(); // Create a new router instance

// Public routes
router.post('/signup', signup);  // Route for user signup
router.post('/login', login);    // Route for user login

// Example of a protected route (only accessible with valid token)
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}` }); 
});

// Export router to be used in server.js
export default router;
