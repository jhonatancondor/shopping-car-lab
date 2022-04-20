const { dependencyServices } = require('@condor-labs/health-middleware');
const { dbsConnections } = require('./db.config');

const healthConfig = {
  //only need modify params that you need it
  service: 'Shopping Car',
  description: 'Personal Project Shopping Car',
  dependencies: [
    {
      service: dependencyServices.REDIS,
      componentName: 'MyRedis',
      connection: dbsConnections.redisDb.Settings,
    },
    {
      service: dependencyServices.MONGODB,
      componentName: 'MyMongoDB',
      connection: dbsConnections.mongoDb.Settings,
    },
  ],
};
module.exports = {
  healthConfig,
};
