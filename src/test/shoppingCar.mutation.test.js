const FormatError = require('easygraphql-format-error/lib');
const errorConstants = require('../config/errorConstant.config');
const modelShoppingCar = require('../models/shopingCar.model');
const {
  createShoppingCar,
  addProductShoppingCar,
  removeProductShoppingCar,
} = require('../resolvers/ShoppingCar/mutation.resolver');
const mockingoose = require('mockingoose');
const modelProducts = require('../models/products.model');

const formatError = new FormatError(errorConstants);

const errorName = formatError.errorName;

describe('test createShoppingCar', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  it('should return the doc createShoppingCar', async () => {
    mockingoose(modelShoppingCar).toReturn([]);

    mockingoose(modelProducts).toReturn([
      {
        _id: '6255f8d60d59562d488041b0',
        code: 'product_code_tech',
        name: 'Producto 1',
        price: 10000,
        category: 'TECH',
      },
      {
        _id: '6256ec8f342de537b8d36119',
        code: 'pasta-intaliana-food',
        name: 'Pasta Italianisimass',
        price: 15000,
        category: 'FOOD',
      },
    ]);

    const testCreateShoppingCar = await createShoppingCar(
      {},
      {
        input: {
          products: [
            {
              productId: '6255f8d60d59562d488041b0',
              Quantity: 3,
            },
            {
              productId: '6256ec8f342de537b8d36119',
              Quantity: 5,
            },
          ],
        },
      },
      { errorName: errorName }
    );

    expect(testCreateShoppingCar).toHaveProperty('products');
    expect(testCreateShoppingCar).toHaveProperty('_id');
    expect(testCreateShoppingCar).toHaveProperty('totalPrice');
    expect(testCreateShoppingCar).toHaveProperty('code');
  });
  it('should return createShoppingCar With Error', async () => {
    mockingoose(modelShoppingCar).toReturn([]);

    mockingoose(modelProducts).toReturn([]);

    try {
      const testCreateShoppingCar = await createShoppingCar(
        {},
        {
          input: {
            products: [
              {
                productId: '6255f8d60d59562d488041b0',
                Quantity: 3,
              },
              {
                productId: '6256ec8f342de537b8d36119',
                Quantity: 5,
              },
            ],
          },
        },
        { errorName: errorName }
      );
      expect(testCreateShoppingCar);
    } catch (error) {
      expect(error.message).toBe('PRODUCT_DATA_INVALID');
    }
  });
});

describe('test addProductShoppingCar', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  it('should return the doc addProductShoppingCar', async () => {
    mockingoose(modelShoppingCar).toReturn(
      {
        _id: '625ddb73f9c1087acd3dbe40',
        code: 'DR1rWpdT',
        totalPrice: '150000',
        products: [
          {
            productId: '6255f8d60d59562d488041b0',
            Quantity: 3,
          },
          {
            productId: '6256ec8f342de537b8d36119',
            Quantity: 4,
          },
          {
            productId: '625d8d922e7a186b6a5ab86e',
            Quantity: 1,
          },
        ],
      },
      'findOne'
    );

    mockingoose(modelProducts).toReturn(
      [
        {
          _id: '6255f8d60d59562d488041b0',
          code: 'product_code_tech',
          name: 'Producto 1',
          price: 10000,
          category: 'TECH',
        },
        {
          _id: '6256ec8f342de537b8d36119',
          code: 'pasta-intaliana-food',
          name: 'Pasta Italianisimass',
          price: 15000,
          category: 'FOOD',
        },
        {
          _id: '6256f4579213ca3918ecdabb',
          code: 'arroz-paisa-food',
          name: 'Arroz Paisa 3',
          price: 15000,
          category: 'FOOD',
        },
        {
          _id: '625d8d922e7a186b6a5ab86e',
          code: 'producto-3-toys-0002',
          name: 'Producto 3',
          price: 10000,
          category: 'TOYS',
        },
      ],
      'find'
    );

    const testAddProductShoppingCar = await addProductShoppingCar(
      {},
      {
        codeCar: 'DR1rWpdT',
        input: [
          {
            productId: '6255f8d60d59562d488041b0',
            Quantity: 1,
          },
          {
            productId: '6256f4579213ca3918ecdabb',
            Quantity: 1,
          },
          {
            productId: '625d8d922e7a186b6a5ab86e',
            Quantity: -1,
          },
        ],
      },
      { errorName: errorName }
    );

    expect(testAddProductShoppingCar).toHaveProperty('products');
    expect(testAddProductShoppingCar).toHaveProperty('_id');
    expect(testAddProductShoppingCar).toHaveProperty('totalPrice');
    expect(testAddProductShoppingCar).toHaveProperty('code');
  });
  it('should return addProductShoppingCar With Error PRODUCT_DATA_INVALID', async () => {
    mockingoose(modelShoppingCar).toReturn({}, 'findOne');

    mockingoose(modelProducts).toReturn([], 'find');

    try {
      const testAddProductShoppingCar = await addProductShoppingCar(
        {},
        {
          codeCar: 'DR1rWpdT',
          input: [
            {
              productId: '6255f8d60d59562d488041b0',
              Quantity: 1,
            },
          ],
        },
        { errorName: errorName }
      );
      expect(testAddProductShoppingCar);
    } catch (error) {
      expect(error.message).toBe('PRODUCT_DATA_INVALID');
    }
  });
  it('should return addProductShoppingCar With Error SHOPPINGCAR_NO_FOUND', async () => {
    mockingoose(modelShoppingCar).toReturn({});

    mockingoose(modelProducts).toReturn(
      [
        {
          _id: '6255f8d60d59562d488041b0',
          code: 'product_code_tech',
          name: 'Producto 1',
          price: 10000,
          category: 'TECH',
        },
      ],
      'find'
    );

    try {
      const testAddProductShoppingCar = await addProductShoppingCar(
        {},
        {
          codeCar: 'DR1rWpdT',
          input: [
            {
              productId: '6255f8d60d59562d488041b0',
              Quantity: 1,
            },
          ],
        },
        { errorName: errorName }
      );
      expect(testAddProductShoppingCar);
    } catch (error) {
      expect(error.message).toBe('SHOPPINGCAR_NO_FOUND');
    }
  });
});

describe('test removeProductShoppingCar', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  it('should return the doc removeProductShoppingCar', async () => {
    mockingoose(modelShoppingCar).toReturn(
      {
        _id: '625ddb73f9c1087acd3dbe40',
        code: 'DR1rWpdT',
        totalPrice: '150000',
        products: [
          {
            productId: '6255f8d60d59562d488041b0',
            Quantity: 3,
          },
          {
            productId: '6256ec8f342de537b8d36119',
            Quantity: 4,
          },
          {
            productId: '625d8d922e7a186b6a5ab86e',
            Quantity: 3,
          },
        ],
      },
      'findOne'
    );

    mockingoose(modelProducts).toReturn(
      [
        {
          _id: '6255f8d60d59562d488041b0',
          code: 'product_code_tech',
          name: 'Producto 1',
          price: 10000,
          category: 'TECH',
        },
        {
          _id: '6256ec8f342de537b8d36119',
          code: 'pasta-intaliana-food',
          name: 'Pasta Italianisimass',
          price: 15000,
          category: 'FOOD',
        },
        {
          _id: '625d8d922e7a186b6a5ab86e',
          code: 'producto-3-toys-0002',
          name: 'Producto 3',
          price: 10000,
          category: 'TOYS',
        },
      ],
      'find'
    );

    const testRemoveProductShoppingCar = await removeProductShoppingCar(
      {},
      {
        codeCar: 'DR1rWpdT',
        productId: '6255f8d60d59562d488041b0',
      },
      { errorName: errorName }
    );

    expect(testRemoveProductShoppingCar).toHaveProperty('products');
    expect(testRemoveProductShoppingCar).toHaveProperty('_id');
    expect(testRemoveProductShoppingCar).toHaveProperty('totalPrice');
    expect(testRemoveProductShoppingCar).toHaveProperty('code');
  });
  it('should return removeProductShoppingCar With Error SHOPPINGCAR_NO_FOUND', async () => {
    mockingoose(modelShoppingCar).toReturn({});

    try {
      const testRemoveProductShoppingCar = await removeProductShoppingCar(
        {},
        {
          codeCar: 'DR1rWpdT',
          productId: '6255f8d60d59562d488041b0',
        },
        { errorName: errorName }
      );
      expect(testRemoveProductShoppingCar);
    } catch (error) {
      expect(error.message).toBe('SHOPPINGCAR_NO_FOUND');
    }
  });
  it('should return removeProductShoppingCar With Error SHOPPINGCAR_PRODUCT_NO_FOUND', async () => {
    mockingoose(modelShoppingCar).toReturn(
      {
        _id: '625ddb73f9c1087acd3dbe40',
        code: 'DR1rWpdT',
        totalPrice: '150000',
        products: [
          {
            productId: '6255f8d60d59562d488041b0',
            Quantity: 3,
          },
          {
            productId: '6256ec8f342de537b8d36119',
            Quantity: 4,
          },
          {
            productId: '625d8d922e7a186b6a5ab86e',
            Quantity: 3,
          },
        ],
      },
      'findOne'
    );

    try {
      const testRemoveProductShoppingCar = await removeProductShoppingCar(
        {},
        {
          codeCar: 'DR1rWpdT',
          productId: '6255f8d60d59562d488041b6',
        },
        { errorName: errorName }
      );
      expect(testRemoveProductShoppingCar);
    } catch (error) {
      expect(error.message).toBe('SHOPPINGCAR_PRODUCT_NO_FOUND');
    }
  });
});
