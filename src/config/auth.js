require('dotenv').config();

module.exports = {
    JWT_KEY: process.env.JWT_KEY || '',
    JWT_EXPIRED: process.env.JWT_EXPIRED || ''
}
