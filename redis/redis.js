// redis.js createClient. This is so a /pages.file.tsx ----> multiple components can import the redisClient and use the cached data.
// bookmarking crazy fact that if the computer is shut off and unplugged the cache persists since redis runs off of RAM. 
import redis from 'redis';
const redisClient = redis.createClient();
export default redisClient;
