const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnect");
const { getAllProducts, getProductById } = require("../model/product");

const typeDefs = `#graphql    #ini wajib tambahkan paling awal
  type Product {
    _id: ID
    name: String
    price: Int
    quantity: Int
    createdAt: String
    comments: [String]
    likes: [String]
  }

  type Query {
    getProducts: [Product]
    getProductById(productId: ID): Product
  }
  
  type Mutation {
    addProduct(name: String!, price: Int!, quantity: Int!) : Product
    deleteProductById(productId: ID!): String
  }
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      const products = await getAllProducts();

      return products;
    },
    getProductById: async (parent, args) => {
      const { productId } = args;

      const product = await getProductById(productId);

      return product;
    },
  },
  Mutation: {
    addProduct: async (parent, args) => {
      const { name, price, quantity } = args;

      const db = getDatabase();
      const productCollection = db.collection("products");
      // const userCollection = db.collection('users')

      const newProduct = await productCollection.insertOne({
        name,
        price,
        quantity,
        createdAt: new Date(),
        comments: [],
        likes: [],
      });

      // console.log(newProduct, "<<< new product { acknowledge, insertedId }");

      const product = await productCollection.findOne({
        _id: newProduct.insertedId,
      });

      return product;
    },
    deleteProductById: async (parent, args) => {
      const { productId } = args;
      const db = getDatabase();
      const productCollection = db.collection("products");

      await productCollection.deleteOne({
        _id: new ObjectId(productId),
      });

      return `Successfully delete product`;
    },
  },
};

module.exports = {
  productTypeDefs: typeDefs,
  productResolvers: resolvers,
};
