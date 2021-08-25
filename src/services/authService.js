const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
    generateToken(user) {
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.expired
        });

        return token;
    }
}
