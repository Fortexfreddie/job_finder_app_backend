// Import User model
import User from '../models/userModel.js';

// Import helper function to generate JWT token
import { generateToken } from '../utils/generateJWT.js';

// ====================== SIGNUP ======================
export const signup = async (req, res) => {
    try {
        const { name, email, phonenumber, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user (password is hashed automatically by pre-save hook in User model)
        const user = await User.create({ name, email, phonenumber, password });

        // Send back user info + token
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====================== LOGIN ======================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Compare entered password with hashed password (using custom method in User model)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Send back token + user info
        res.json({
            message: 'Login successful',
            token: generateToken(user), // issue new JWT
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
