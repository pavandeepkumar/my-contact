const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

            req.user = decoded.user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Not authorized user' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized' });
    }
});

module.exports = validateTokenHandler;
