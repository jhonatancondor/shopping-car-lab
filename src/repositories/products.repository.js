const modelProducts = require('../models/products.model');

async function getProductsByIds(ids) {
  return await modelProducts.find({ _id: { $in: ids } });
}

async function findByCode(code) {
  return await modelProducts.findOne({ code: code });
}

async function findProducts(limit, offset) {
  return await modelProducts.find().limit(parseInt(limit)).skip(parseInt(offset));
}

async function createProduct(product) {
  return await modelProducts.create(product);
}

async function updateByCode(code, input) {
  return await modelProducts.findOneAndUpdate({ code: code }, input, {
    new: true,
    runValidators: true,
  });
}

module.exports = {
  getProductsByIds,
  findByCode,
  findProducts,
  createProduct,
  updateByCode,
};
