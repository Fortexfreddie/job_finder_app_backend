// Import jsonwebtoken library
import jwt from 'jsonwebtoken';

// Middleware function to protect routes
// Runs before the controller if attached to a route
const authMiddleware = (req, res, next) => {
    // Get token from request header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token, deny access
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info from token payload to request object
        req.user = decoded;

        // Continue to the next middleware or controller
        next();
    } catch (error) {
        // If token invalid or expired
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Export the middleware function (ESM syntax)
export default authMiddleware;