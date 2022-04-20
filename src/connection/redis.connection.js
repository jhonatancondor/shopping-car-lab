const { dbsConnections } = require('../config/db.config');

const redis = require('@condor-labs/redis')(dbsConnections.redisDb.Settings);
async function connectRedis() {
  // get client
  const client = await redis.getClient();
  return client;
}

module.exports = connectRedis;
