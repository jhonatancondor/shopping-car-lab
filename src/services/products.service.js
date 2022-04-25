/* eslint eqeqeq: 0 */

const { getProductsByIds, findByCode } = require('../repositories/products.repository');

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

  const exitsCodeVal = await findByCode(code);

  if (exitsCodeVal) {
    return generateCode(string, count + 1);
  }
  return code;
}

module.exports = {
  getProductsByIds,
  validateIdsProducts,
  generateCode,
};
