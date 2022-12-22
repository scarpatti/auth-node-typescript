import Redis from 'redis';
import cacheConfig from '../config/cache';

const redisClient = Redis.createClient({ host: cacheConfig.host, password: cacheConfig.password });

redisClient.on('connect', () => {
    console.log('REDIS READY');
});

redisClient.on('error', (e) => {
    console.log('REDIS ERROR', e);
});

export default redisClient;
