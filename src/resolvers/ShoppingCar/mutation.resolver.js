/* eslint eqeqeq: 0 */

const { generateCode } = require('../../utils/general.functions');
const { getProductsByIds, validateIdsProducts } = require('../../services/products.service');
const { getTotalPrice } = require('../../services/shoppingCar.service');
const { createShoppingCarRepo, findByCode } = require('../../repositories/shoppingCar.repository');

module.exports = {
  async createShoppingCar(_, { input }, { errorName }) {
    try {
      const idsProducts = input.products.map((item) => item.productId);

      await validateIdsProducts(idsProducts, errorName);

      const productsData = await getProductsByIds(idsProducts);

      let totalPrice = 0;

      for (const product of productsData) {
        const quantityProduct = input.products.find((item) => item.productId == product._id);

        totalPrice += quantityProduct.Quantity * product.price;
      }

      input.totalPrice = String(totalPrice);

      input.code = generateCode(8);

      const newShoppingCar = await createShoppingCarRepo(input);

      return newShoppingCar;
    } catch (error) {
      if (error in errorName) {
        throw new Error(errorName[error]);
      } else {
        throw new Error(error);
      }
    }
  },
  async addProductShoppingCar(_, { codeCar, input }, { errorName }) {
    try {
      await validateIdsProducts(
        input.map((item) => item.productId),
        errorName
      );

      const shoppingCar = await findByCode(codeCar);

      if (!shoppingCar) {
        throw errorName.SHOPPINGCAR_NO_FOUND;
      }

      for (let productKey = 0; productKey < input.length; productKey++) {
        const productExits = shoppingCar.products.findIndex((item) => item.productId == input[productKey].productId);

        if (productExits > -1) {
          shoppingCar.products[productExits].Quantity += input[productKey].Quantity;
          if (shoppingCar.products[productExits].Quantity <= 0) {
            shoppingCar.products.splice(productExits, 1);
          }
        } else if (input[productKey].Quantity > 0) {
          shoppingCar.products.push(input[productKey]);
        }
      }

      shoppingCar.markModified('products');

      const idsProducts = shoppingCar.products.map((item) => item.productId);

      const productsData = await getProductsByIds(idsProducts);

      shoppingCar.totalPrice = String(getTotalPrice(shoppingCar, productsData));

      await shoppingCar.save();

      return shoppingCar;
    } catch (error) {
      if (error in errorName) {
        throw new Error(errorName[error]);
      } else {
        throw new Error(error);
      }
    }
  },

  async removeProductShoppingCar(_, { codeCar, productId }, { errorName }) {
    try {
      const shoppingCar = await findByCode(codeCar);

      if (!shoppingCar) {
        throw errorName.SHOPPINGCAR_NO_FOUND;
      }

      const idxProduct = shoppingCar.products.findIndex((item) => item.productId == productId);

      if (idxProduct > -1) {
        shoppingCar.products.splice(idxProduct, 1);
        shoppingCar.markModified('products');
      } else {
        throw errorName.SHOPPINGCAR_PRODUCT_NO_FOUND;
      }

      const idsProducts = shoppingCar.products.map((item) => item.productId);

      const productsData = await getProductsByIds(idsProducts);

      shoppingCar.totalPrice = String(getTotalPrice(shoppingCar, productsData));

      await shoppingCar.save();

      return shoppingCar;
    } catch (error) {
      if (error in errorName) {
        throw new Error(errorName[error]);
      } else {
        throw new Error(error);
      }
    }
  },
};
