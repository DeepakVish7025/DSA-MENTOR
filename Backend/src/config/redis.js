const { createClient }  = require('redis');

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19088.c232.us-east-1-2.ec2.cloud.redislabs.com',
        port: 19088
    }
});

module.exports = client;


