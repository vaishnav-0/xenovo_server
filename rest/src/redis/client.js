const createClient = require('redis').createClient;

const client = createClient({
  url: process.env.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect()

module.exports = client;