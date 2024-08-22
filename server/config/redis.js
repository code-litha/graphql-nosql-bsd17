const Redis = require("ioredis");
const redis = new Redis(); // localhost:6379

// const redis = new Redis({
//   port: 16354, // Redis port
//   host: "redis-...redis-cloud.com", // Redis host
//   password: "0IsQo9eAU4njTHDOlZaLzss3hIo...",
// });

module.exports = redis;
