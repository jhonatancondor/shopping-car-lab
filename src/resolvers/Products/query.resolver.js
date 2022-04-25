const { findProducts, findByCode } = require('../../repositories/products.repository');
const { getKey } = require('../../utils/redis.functions');

module.exports = {
  products: async (_, { limit, offset }) => {
    return await findProducts(limit, offset);
  },
  product: async (_, { code }, { clientRedis, errorName }) => {
    try {
      let jsonProductRedis = await getKey(clientRedis, code);

      if (jsonProductRedis) {
        return JSON.parse(jsonProductRedis);
      }

      jsonProductRedis = await findByCode(code);

      if (jsonProductRedis) {
        await clientRedis.set(code, JSON.stringify(jsonProductRedis), 'EX', 300);
      } else {
        throw errorName.PRODUCT_NOT_FOUND;
      }

      return jsonProductRedis;
    } catch (error) {
      if (error in errorName) {
        throw new Error(errorName[error]);
      } else {
        throw new Error(error);
      }
    }
  },
};
