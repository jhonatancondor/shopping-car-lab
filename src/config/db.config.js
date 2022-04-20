const dbsConnections = {
  mongoDb: {
    Settings: {
      host: 'condortrain-shard-00-00.u65yx.mongodb.net,condortrain-shard-00-01.u65yx.mongodb.net,condortrain-shard-00-02.u65yx.mongodb.net',
      database: 'shoppingCar',
      user: 'jhonatancondor',
      password: '!Condor2022',
      ssl: true,
      authSource: 'admin',
    },
  },
  redisDb: {
    Settings: {
      host: 'redis-15043.c17.us-east-1-4.ec2.cloud.redislabs.com',
      port: 15043,
      password: 'HtW4xctEXPdXRU1uukkEUZxU2Xk7hjcV',
    },
  },
};

module.exports = {
  dbsConnections,
};
