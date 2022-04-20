/* eslint eqeqeq: 0 */

function getTotalPrice(shoppingCar, productsData) {
  let totalPrice = 0;

  for (const product of shoppingCar.products) {
    const productData = productsData.find((item) => item._id == product.productId);

    if (productData) {
      totalPrice += product.Quantity * productData.price;
    }
  }

  return totalPrice;
}

module.exports = {
  getTotalPrice,
};
