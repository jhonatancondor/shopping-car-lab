const mongodb = require('@condor-labs/mongodb')();

const schemaProducts = mongodb.mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ['FOOD', 'TECH', 'TOYS'],
        message: '{VALUE} is not supported in category',
      },
    },
  },
  { timestamps: true }
);
const modelProducts = mongodb.mongoose.model('products', schemaProducts);

module.exports = modelProducts;
