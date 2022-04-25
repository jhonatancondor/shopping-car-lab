const dbsConnections = {
  mongoDb: {
    Settings: {
      host: process.env.MONGO_HOST,
      database: process.env.MONGO_DATABASE,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASS,
      ssl: true,
      authSource: 'admin',
    },
  },
  redisDb: {
    Settings: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
    },
  },
};

module.exports = {
  dbsConnections,
};
