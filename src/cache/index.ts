import Redis from 'redis';

const redisClient = Redis.createClient({ host: "fertigation-auth-api-redis", password: "Redis!!@" });

redisClient.on('connect', () => {
    console.log('REDIS READY');
});

redisClient.on('error', (e) => {
    console.log('REDIS ERROR', e);
});

export default redisClient;
