/* eslint eqeqeq: 0 */

const modelProducts = require('../models/products.model');

async function getProductsByIds(ids) {
  return await modelProducts.find({ _id: { $in: ids } });
}

async function validateIdsProducts(ids, errorName) {
  const productsData = await getProductsByIds(ids);
  for (const id of ids) {
    const exits = productsData.find((item) => item._id == id);
    if (!exits) {
      throw errorName.PRODUCT_DATA_INVALID;
    }
  }
}

async function generateCode(string, count) {
  let code = string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  if (count > 0) {
    code = `${code}-${count}`;
  }

  const exitsCode = await modelProducts.findOne({ code: code });

  if (exitsCode) {
    return generateCode(string, count + 1);
  }
  return code;
}

module.exports = {
  getProductsByIds,
  validateIdsProducts,
  generateCode,
};
