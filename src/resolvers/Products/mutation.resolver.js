/* eslint eqeqeq: 0 */

const modelProducts = require('../../models/products.model');
const { createProduct, updateByCode } = require('../../repositories/products.repository');
const { generateCode } = require('../../services/products.service');

module.exports = {
  async createProduct(_, { products }, { errorName }) {
    try {
      products.code = await generateCode(`${products.name} ${products.category}`, 0);
      if (products.price <= 0) {
        throw errorName.PRODUCT_PRICE_NOT_VALID;
      }
      return await createProduct(products);
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteProduct(_, { code }, { clientRedis, errorName }) {
    try {
      const deleteProduct = await modelProducts.findOneAndDelete({ code: code });
      clientRedis.del(code);
      if (deleteProduct !== null && typeof deleteProduct !== 'undefined') {
        return deleteProduct;
      }

      throw errorName.PRODUCT_DELETE_NOT_FOUND;
    } catch (error) {
      if (error in errorName) {
        throw new Error(errorName[error]);
      } else {
        throw new Error(error);
      }
    }
  },
  async updateProduct(_, { code, input }, { clientRedis, errorName }) {
    try {
      clientRedis.del(code);
      if (input.price <= 0) {
        throw errorName.PRODUCT_PRICE_NOT_VALID;
      }
      const updateProduct = await updateByCode(code, input);
      if (updateProduct) {
        return updateProduct;
      }
      throw errorName.PRODUCT_UPDATE_NOT_FOUND;
    } catch (error) {
      if (error in errorName) {
        throw new Error(errorName[error]);
      } else {
        throw new Error(error);
      }
    }
  },
};
