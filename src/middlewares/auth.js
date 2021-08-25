const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if(!authHeader)
            return res.status(401).json({ error: 'No token provided' });

        const parts = authHeader.split(' ');

        if(!parts.length === 2)
             return res.status(401).json({ error: 'Token error' });


        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme))
            return res.status(401).json({ error: 'Token malformated' });

        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if(error) return res.status(401).json({ error: 'Invalid Token' });

            req.userId = decoded.id;

            next();
        })

    } catch(error) {
        return res.status(401).json({ error: 'Invalid Token' });

    }

}
