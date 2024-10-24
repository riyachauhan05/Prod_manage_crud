
const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    // Check for the presence of the authorization header
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
        ? req.headers.authorization.split(' ')[1] 
        : null;

    // If no token is found, respond with 403 Forbidden
    if (!token) {
        return res.status(403).json({ message: 'Access forbidden: No access provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Access forbidden: No access provided to you' });
        }

        // Attach the decoded user information to the request object
        req.user = user; // Assuming 'user' contains necessary information (like user ID)
        next(); // Proceed to the next middleware or route handler
    });
};
