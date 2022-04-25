const errorConstants = [
  {
    name: 'INVALID_DATA',
    message: 'The data sent is not valid.',
    statusCode: '400',
  },
  {
    name: 'PRODUCT_DATA_INVALID',
    message: 'Products sent Not Found',
    statusCode: '404',
  },
  {
    name: 'SHOPPINGCAR_NO_FOUND',
    message: 'ShoppingCar Not Found.',
    statusCode: '404',
  },
  {
    name: 'SHOPPINGCAR_PRODUCT_NO_FOUND',
    message: 'Product in ShoppingCar Not Found.',
    statusCode: '404',
  },
  {
    name: 'PRODUCT_NOT_FOUND',
    message: 'Product Not Found.',
    statusCode: '404',
  },
  {
    name: 'PRODUCT_DELETE_NOT_FOUND',
    message: 'Product to delete Not Found.',
    statusCode: '404',
  },
  {
    name: 'PRODUCT_UPDATE_NOT_FOUND',
    message: 'Product to update Not Found.',
    statusCode: '404',
  },
  {
    name: 'PRODUCT_PRICE_NOT_VALID',
    message: 'Product price must be greater than 0',
    statusCode: '400',
  },
];

module.exports = errorConstants;
