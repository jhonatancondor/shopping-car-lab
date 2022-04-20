const modelProducts = require('../../models/products.model');

module.exports = {
  products: async (_, { limit, offset }) => {
    return await modelProducts.find().limit(parseInt(limit)).skip(parseInt(offset));
  },
  product: async (_, { code }, { clientRedis, errorName }) => {
    try {
      let jsonProductRedis = await clientRedis.getAsync(code);

      if (jsonProductRedis) {
        return JSON.parse(jsonProductRedis);
      }

      jsonProductRedis = await modelProducts.findOne({ code: code });

      if (jsonProductRedis) {
        await clientRedis.set(code, JSON.stringify(jsonProductRedis));
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
