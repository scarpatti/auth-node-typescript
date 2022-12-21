import Redis from 'redis';

const cache = Redis.createClient({ host: "fertigation-auth-api-redis", password: "Redis!!@" });

cache.on('connect', () => {
    console.log('REDIS READY');
});

cache.on('error', (e) => {
    console.log('REDIS ERROR', e);
});

export default cache;
