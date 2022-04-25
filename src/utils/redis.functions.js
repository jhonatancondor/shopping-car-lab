const { promisify } = require('util');

const getKey = async (clientRedis, key) => {
  const getAsync = promisify(clientRedis.get).bind(clientRedis);
  const result = await getAsync(key);
  return result ? result : null;
};
module.exports = {
  getKey,
};
