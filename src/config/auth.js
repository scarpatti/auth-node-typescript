require('dotenv').config();

module.exports = {
    secret: process.env.JWT_KEY,
    expired: process.env.JWT_EXPIRED
}
