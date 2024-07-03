// redis.js createClient. This is so a /pages.file.tsx ----> multiple components can import the redisClient and use the cached
import redis from 'redis';
const redisClient = redis.createClient();
export default redisClient;
