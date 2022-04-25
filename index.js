require('dotenv').config();
const express = require('express');
const { healthMonitor } = require('@condor-labs/health-middleware');
const { healthConfig } = require('./src/config/health.config');
const connectMongoDB = require('./src/connection/mongoDb.connection');
const graphQlSchema = require('./src/schemas/schema');
const { graphqlHTTP } = require('express-graphql');
const logger = require('@condor-labs/logger');
const FormatError = require('easygraphql-format-error');
const errorConstants = require('./src/config/errorConstant.config');
const connectRedis = require('./src/connection/redis.connection');

const formatError = new FormatError(errorConstants);

const errorName = formatError.errorName;

let clientRedis = null;

(async () => {
  clientRedis = await connectRedis();
  connectMongoDB();
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    '/graphql',
    graphqlHTTP((req, res) => {
      return {
        schema: graphQlSchema,
        graphiql: true,
        context: { errorName, clientRedis },
        customFormatErrorFn: (err) => {
          const errorJson = formatError.getError(err);
          res.status(errorJson.statusCode || 500);
          return {
            message: errorJson.message || err.message,
            statusCode: errorJson.statusCode || 500,
          };
        },
      };
    })
  );

  healthMonitor(app, healthConfig);

  const PORT = process.env.EXPRESS_PORT;
  const HOST = process.env.EXPRESS_HOST;

  app.listen(PORT, HOST);
  logger.debug(`Running on http://${HOST}:${PORT}`);
})();
