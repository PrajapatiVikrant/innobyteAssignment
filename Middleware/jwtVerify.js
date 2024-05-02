// jwtVerify.js

const jwt = require('jsonwebtoken');
require('dotenv').config();


function jwtVerify(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    

    if (!token) {
        
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SCERET_KEY, (err, decoded) => {
        if (err) {
            
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = jwtVerify;
