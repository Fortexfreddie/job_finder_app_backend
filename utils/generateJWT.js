import jwt from 'jsonwebtoken';  // Import jsonwebtoken library

// Function to generate a signed JWT token for a user
export const generateToken = (user) => {
    return jwt.sign(
      { id: user._id, name: user.name, email: user.email }, // Payload: only include user ID, name and email
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: "1h" } // Token expiry (1 hour)
    );
};