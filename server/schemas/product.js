const { ObjectId } = require("mongodb");
const { getDatabase, client } = require("../config/mongoConnect");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  addImagesToProduct,
} = require("../models/product");
const { GraphQLError } = require("graphql");
const redis = require("../config/redis");

const KEY_DATA_PRODUCTS = "data:products";

const typeDefs = `#graphql    #ini wajib tambahkan paling awal
  type Product {
    _id: ID
    name: String
    price: Int
    quantity: Int
    createdAt: String
    comments: [String]
    likes: [String]
    authorId: ID    #reference document
    author: User
    images: [Image]
  }

  type Order {
    _id: ID
    userId: ID
    productId: ID
    totalPrice: Int
    quantity: Int
    createdAt: String
  }

  type Image {       #embedded document
    url: String
    createdAt: String
  }

  type Query {
    getProducts: [Product]
    getProductById(productId: ID): Product
  }
  
  type Mutation {
    addProduct(name: String!, price: Int!, quantity: Int!) : Product
    deleteProductById(productId: ID!): String
    addImageToProduct(url: String!, productId: ID!): Product
    addOrder(productId: ID!, quantity: Int!): Order 
  }
`;

const resolvers = {
  Query: {
    getProducts: async (parent, args, contextValue) => {
      // console.log(await contextValue.auth(), "<<< contextValue");
      // const userLogin = await contextValue.auth();

      const productCache = await redis.get(KEY_DATA_PRODUCTS);

      // console.log(productCache, "<<< productCache");
      if (productCache) {
        return JSON.parse(productCache);
      }

      // console.log(userLogin, "<<< userLogin");
      const products = await getAllProducts();

      redis.set(KEY_DATA_PRODUCTS, JSON.stringify(products));

      return products;
    },
    getProductById: async (parent, args, contextValue) => {
      // console.log(contextValue.auth(), "<<< contextValue");
      // const userLogin = await contextValue.auth();

      // console.log(userLogin, "<<< userLogin");
      const { productId } = args;

      const product = await getProductById(productId);

      return product;
    },
  },
  Mutation: {
    addProduct: async (parent, args) => {
      const { name, price, quantity } = args;

      const product = await createProduct(name, price, quantity);

      redis.del(KEY_DATA_PRODUCTS); // invalidate cache, jadi kalau ada perubahan data, redisnya di hapus
      return product;
    },
    deleteProductById: async (parent, args) => {
      const { productId } = args;

      await deleteProduct(productId);

      return `Successfully delete product`;
    },
    addImageToProduct: async (parent, args) => {
      const { url, productId } = args;

      return await addImagesToProduct(url, productId);
    },
    addOrder: async (parent, args, contextValue) => {
      const session = client.startSession();
      try {
        session.startTransaction();

        const userLogin = await contextValue.auth();
        const { productId, quantity } = args;
        // console.log(args, "<<<< args");
        const db = getDatabase();
        const productCollection = db.collection("products");
        const orderCollection = db.collection("orders");

        const findProduct = await productCollection.findOne(
          {
            _id: new ObjectId(productId),
          },
          { session }
        );

        if (!findProduct) {
          throw new GraphQLError("Product Not Found", {
            extensions: {
              code: "NOT_FOUND",
              http: { status: 404 },
            },
          });
        }

        if (findProduct.quantity < quantity) {
          throw new GraphQLError("Out of Stock", {
            extensions: {
              code: "BAD_REQUEST",
              http: { status: 400 },
            },
          });
        }

        const newOrder = await orderCollection.insertOne(
          {
            userId: userLogin.userId,
            productId: new ObjectId(productId),
            quantity,
            totalPrice: findProduct.price * quantity,
            createdAt: new Date(),
          },
          { session }
        );

        await productCollection.updateOne(
          { _id: findProduct._id },
          { $set: { quantity: findProduct.quantity - quantity } },
          { session }
        );

        const order = await orderCollection.findOne(
          { _id: newOrder.insertedId },
          { session }
        );

        await session.commitTransaction();

        return order;
      } catch (error) {
        await session.abortTransaction();

        throw error;
      } finally {
        await session.endSession();
      }
    },
  },
};

module.exports = {
  productTypeDefs: typeDefs,
  productResolvers: resolvers,
};
