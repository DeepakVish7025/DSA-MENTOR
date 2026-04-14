const { createClient } = require('redis');



const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-16567.crce296.us-east-1-6.ec2.cloud.redislabs.com',
        port: 16567
    }
});

module.exports= redisClient;