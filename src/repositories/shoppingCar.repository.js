const modelShoppingCar = require('../models/shopingCar.model');

async function createShoppingCarRepo(input) {
  return await modelShoppingCar.create(input);
}

async function findByCode(code) {
  return await modelShoppingCar.findOne({ code: code });
}

module.exports = {
  createShoppingCarRepo,
  findByCode,
};
