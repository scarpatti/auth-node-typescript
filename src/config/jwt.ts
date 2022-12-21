require('dotenv').config();

const jwtConfig = {
    JWT_KEY: process.env.JWT_KEY || '',
    JWT_ACCESS_TOKEN_EXPIRED: process.env.JWT_ACCESS_TOKEN_EXPIRED || '',
    JWT_REFRESH_TOKEN_EXPIRED: process.env.JWT_REFRESH_TOKEN_EXPIRED || '',
    JWT_REDIS_KEY_NAME: process.env.JWT_REDIS_KEY_NAME || ''
}

export default jwtConfig;
