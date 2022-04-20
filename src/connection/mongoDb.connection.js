const { dbsConnections } = require('../config/db.config');
const logger = require('@condor-labs/logger');

const mongodb = require('@condor-labs/mongodb')(dbsConnections.mongoDb.Settings);
async function connectMongoDB() {
  // connect to Mongo
  await mongodb.getClient();
  logger.info(`isConnected(after):${mongodb._isConnected()}`);
}
module.exports = connectMongoDB;
