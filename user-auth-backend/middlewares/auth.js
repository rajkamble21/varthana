const jwt = require('jsonwebtoken')
require('dotenv').config();

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided" });
    }
    try {
        token = token.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Invalid token' });
    }

}

module.exports = auth;