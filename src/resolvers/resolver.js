const queryResolver = require('./Products/query.resolver');
const mutationResolver = require('./Products/mutation.resolver');
const mutationResolverShoppingCar = require('./ShoppingCar/mutation.resolver');

module.exports = {
  Query: {
    ...queryResolver,
  },

  Mutation: {
    ...mutationResolver,
    ...mutationResolverShoppingCar,
  },
};
