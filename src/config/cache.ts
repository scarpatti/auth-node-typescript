require('dotenv/config');

const cacheConfig = {
    host: process.env.REDIS_DB_HOST,
    port: process.env.REDIS_DB_PORT,
    password: process.env.REDIS_DB_PASSWORD,
};

export default cacheConfig;
