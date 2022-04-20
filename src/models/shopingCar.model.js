const mongodb = require('@condor-labs/mongodb')();

const schemaShoppingCar = mongodb.mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
    },
  },
  { timestamps: true }
);
const modelShoppingCar = mongodb.mongoose.model('shoppingCar', schemaShoppingCar);

module.exports = modelShoppingCar;
