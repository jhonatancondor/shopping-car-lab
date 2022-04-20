// const { buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers/resolver');

const typeDefs = `
    type Products {
        _id: ID!
        code: String
        name: String!
        price: Int!
        category: String!
    }
    input ProductsType {
        name: String!
        price: Int!
        category: String!
    }
    type Query {
        products(limit: Int!, offset: Int!): [Products!]
        product(code: String!): Products!
    }

    input ShoppingProductsType_i {
        productId: ID!
        Quantity: Int!
    }

    type ShoppingProductsType_t {
        productId: ID!
        Quantity: Int!
    }
  
    type ShoppingCar {
      _id: ID!
      code: String
      totalPrice: String
      products: [ShoppingProductsType_t!]
    }

    input ShoppingCarType {
        code: String
        totalPrice: String
        products: [ShoppingProductsType_i!]
    }
    
    type Mutation {
      createProduct(products:ProductsType): Products,
      deleteProduct(code: String): Products,
      updateProduct(code: String, input: ProductsType): Products
      createShoppingCar(input:ShoppingCarType!): ShoppingCar
      addProductShoppingCar(codeCar: String!, input: [ShoppingProductsType_i!]): ShoppingCar
      removeProductShoppingCar(codeCar: String!, productId: String!): ShoppingCar
    }

`;

module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
