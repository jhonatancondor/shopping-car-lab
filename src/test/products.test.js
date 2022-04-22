const { expect } = require('@jest/globals');
const FormatError = require('easygraphql-format-error/lib');
const mockingoose = require('mockingoose/lib');
const errorConstants = require('../config/errorConstant.config');
const modelProducts = require('../models/products.model');
const { createProduct, deleteProduct, updateProduct } = require('../resolvers/Products/mutation.resolver');
const { product, products } = require('../resolvers/Products/query.resolver');

const formatError = new FormatError(errorConstants);

const errorName = formatError.errorName;

function createMockRedis() {
  const products = [
    {
      code: 'arroz-paisa-food',
      'arroz-paisa-food':
        '{"_id": "6256f4579213ca3918ecdabb","code": "arroz-paisa-food","name": "Arroz Paisa","price": 15000,"category": "FOOD"}',
    },
  ];
  return {
    getAsync: function (code) {
      return new Promise((resolve) => {
        const search = products.find((product) => product.code === code);
        if (search) {
          resolve(search[code]);
        }
        resolve(null);
      });
    },
    set: function (code, string) {
      const json = { code: code };
      json[code] = string;
      return Promise.resolve(products.push(json));
    },
    del: function (code) {
      const searchIdx = products.findIndex((product) => product.code === code);
      if (searchIdx) {
        products.splice(searchIdx, 1);
      }
    },
  };
}

describe('test GetProducts', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should return the doc Products', async () => {
    mockingoose(modelProducts).toReturn(
      [
        {
          _id: '6256f4579213ca3918ecdabb',
          code: 'arroz-paisa-food',
          name: 'Arroz Paisa',
          price: 15000,
          category: 'FOOD',
        },
        {
          _id: '7256f4579213ca3918ecdabb',
          code: 'bandeja-paisa-food',
          name: 'Bandeja Paisa',
          price: 30000,
          category: 'FOOD',
        },
      ],
      'find'
    );

    const testGetProducts = await products(
      {},
      {
        limit: 2,
        offset: 0,
      },
      { clientRedis: createMockRedis() }
    );

    expect(testGetProducts[0]).toHaveProperty('code');
    expect(testGetProducts[0]).toHaveProperty('_id');
    expect(testGetProducts[0]).toHaveProperty('name');
    expect(testGetProducts[0]).toHaveProperty('price');
    expect(testGetProducts[0]).toHaveProperty('category');

    expect(testGetProducts[1]).toHaveProperty('code');
    expect(testGetProducts[1]).toHaveProperty('_id');
    expect(testGetProducts[1]).toHaveProperty('name');
    expect(testGetProducts[1]).toHaveProperty('price');
    expect(testGetProducts[1]).toHaveProperty('category');
  });
});

describe('test GetDetailProduct', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should return the doc DetailProduct With Redis', async () => {
    mockingoose(modelProducts).toReturn(
      {
        _id: '6256f4579213ca3918ecdabb',
        code: 'arroz-paisa-food',
        name: 'Arroz Paisa',
        price: 15000,
        category: 'FOOD',
      },
      'findOne'
    );

    const testGetDetailProduct = await product(
      {},
      {
        code: 'arroz-paisa-food',
      },
      { clientRedis: createMockRedis() }
    );

    expect(testGetDetailProduct).toHaveProperty('code');
    expect(testGetDetailProduct).toHaveProperty('_id');
    expect(testGetDetailProduct).toHaveProperty('name');
    expect(testGetDetailProduct).toHaveProperty('price');
    expect(testGetDetailProduct).toHaveProperty('category');
  });

  it('should return the doc DetailProduct WithOut Redis', async () => {
    mockingoose(modelProducts).toReturn(
      {
        _id: '7256f4579213ca3918ecdabb',
        code: 'bandeja-paisa-food',
        name: 'Bandeja Paisa',
        price: 30000,
        category: 'FOOD',
      },
      'findOne'
    );

    const testGetDetailProduct = await product(
      {},
      {
        code: 'bandeja-paisa-food',
      },
      { clientRedis: createMockRedis() }
    );

    expect(testGetDetailProduct).toHaveProperty('code');
    expect(testGetDetailProduct).toHaveProperty('_id');
    expect(testGetDetailProduct).toHaveProperty('name');
    expect(testGetDetailProduct).toHaveProperty('price');
    expect(testGetDetailProduct).toHaveProperty('category');
  });

  it('should return the doc DetailProduct Product No Exit', async () => {
    mockingoose(modelProducts).toReturn({});
    await expect(
      product(
        {},
        {
          code: 'bandeja-paisa-food',
        },
        { clientRedis: createMockRedis(), errorName: errorName }
      )
    ).rejects.toThrowError('PRODUCT_NOT_FOUND');
  });
});

describe('test createProduct', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should return the doc createProduct', async () => {
    mockingoose(modelProducts).toReturn();

    const testCreateProduct = await createProduct(
      {},
      {
        products: {
          name: 'Computador 7 nucleos',
          price: '20000000',
          category: 'TECH',
        },
      }
    );

    expect(testCreateProduct).toHaveProperty('_id');
    expect(testCreateProduct).toHaveProperty('name');
    expect(testCreateProduct).toHaveProperty('price');
    expect(testCreateProduct).toHaveProperty('category');
    expect(testCreateProduct).toHaveProperty('code');
  });
});

describe('test deleteProduct', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should return the doc createProduct', async () => {
    mockingoose(modelProducts).toReturn(
      {
        _id: '62607d55ebedf7e3d33c27dd',
        name: 'Computador 7 nucleos',
        price: 20000000,
        category: 'TECH',
        code: 'computador-7-nucleos-tech',
        createdAt: '2022-04-20T21:38:29.707Z',
        updatedAt: '2022-04-20T21:38:29.707Z',
      },
      'findOneAndDelete'
    );

    const testDeleteProduct = await deleteProduct(
      {},
      {
        code: 'computador-7-nucleos-techh',
      },
      { errorName: errorName }
    );

    expect(testDeleteProduct).toHaveProperty('_id');
    expect(testDeleteProduct).toHaveProperty('name');
    expect(testDeleteProduct).toHaveProperty('price');
    expect(testDeleteProduct).toHaveProperty('category');
    expect(testDeleteProduct).toHaveProperty('code');
  });

  it('should return the doc createProduct With Error', async () => {
    mockingoose(modelProducts).toReturn([]);

    await expect(
      deleteProduct(
        {},
        {
          code: 'computador-7-nucleos-techh',
        },
        { errorName: errorName }
      )
    ).rejects.toThrowError('PRODUCT_DELETE_NOT_FOUND');
  });
});

describe('test updateProduct', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should return the doc updateProduct', async () => {
    mockingoose(modelProducts).toReturn(
      {
        _id: '62607d55ebedf7e3d33c27dd',
        name: 'Computador 7 nucleos',
        price: 20000000,
        category: 'TECH',
        code: 'computador-7-nucleos-tech',
        createdAt: '2022-04-20T21:38:29.707Z',
        updatedAt: '2022-04-20T21:38:29.707Z',
      },
      'findOneAndUpdate'
    );

    const testUpdateProduct = await updateProduct(
      {},
      {
        code: 'computador-7-nucleos-tech',
        input: {
          name: 'Computador de escritorio 7 nucleos',
          price: 15000000,
          category: 'TECH',
        },
      },
      { errorName: errorName, clientRedis: createMockRedis() }
    );

    expect(testUpdateProduct).toHaveProperty('_id');
    expect(testUpdateProduct).toHaveProperty('name');
    expect(testUpdateProduct).toHaveProperty('price');
    expect(testUpdateProduct).toHaveProperty('category');
    expect(testUpdateProduct).toHaveProperty('code');
  });

  it('should return the doc updateProduct With Error', async () => {
    mockingoose(modelProducts).toReturn([]);

    await expect(
      updateProduct(
        {},
        {
          code: 'computador-7-nucleos-tech',
          input: {
            name: 'Computador de escritorio 7 nucleos',
            price: 15000000,
            category: 'TECH',
          },
        },
        { errorName: errorName, clientRedis: createMockRedis() }
      )
    ).rejects.toThrowError('PRODUCT_UPDATE_NOT_FOUND');
  });
});
