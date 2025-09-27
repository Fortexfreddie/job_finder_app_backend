import express from 'express';                 // Import Express
import { signup, login } from '../controllers/authController.js'; // Import controller functions
import authMiddleware from '../middleware/authMiddleware.js';    // Import middleware (for protected routes)

const router = express.Router(); // Create a new router instance

// ========================
// Public routes
// ========================

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Creates a new user account with name, email, password, and phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               phone:
 *                 type: string
 *                 example: +2348012345678
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/signup', signup);  // Route for user signup

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     description: Authenticates a user with email and password, returning a JWT token if valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);    // Route for user login

// ========================
// Example protected route
// ========================

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     summary: Get user profile (protected)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the logged-in user's profile data
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
// router.get('/profile', authMiddleware, (req, res) => {
//   res.json({ message: `Welcome, user ${req.user.id}` }); 
// });

// Export router to be used in server.js
export default router;
