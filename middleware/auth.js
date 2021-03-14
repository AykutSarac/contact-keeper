const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) return res.status(401).json({ msg: "Invalid token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: "Invalid token" });
    }
    
}