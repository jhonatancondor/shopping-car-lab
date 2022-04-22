/* eslint eqeqeq: 0 */

const modelProducts = require('../../models/products.model');
const { generateCode } = require('../../services/products.service');

module.exports = {
  async createProduct(_, { products }) {
    try {
      products.code = await generateCode(`${products.name} ${products.category}`, 0);
      const newProduct = new modelProducts(products);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteProduct(_, { code }, { errorName }) {
    try {
      const deleteProduct = await modelProducts.findOneAndDelete({ code: code });

      if (typeof deleteProduct !== 'undefined') {
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
      const updateProduct = await modelProducts.findOneAndUpdate({ code: code }, input, {
        new: true,
        runValidators: true,
      });
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
