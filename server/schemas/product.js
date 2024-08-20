const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  addImagesToProduct,
} = require("../models/product");

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
  }
`;

const resolvers = {
  Query: {
    getProducts: async (parent, args, contextValue) => {
      // console.log(await contextValue.auth(), "<<< contextValue");
      const userLogin = await contextValue.auth();

      console.log(userLogin, "<<< userLogin");
      const products = await getAllProducts();

      return products;
    },
    getProductById: async (parent, args, contextValue) => {
      // console.log(contextValue.auth(), "<<< contextValue");
      const userLogin = await contextValue.auth();

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
  },
};

module.exports = {
  productTypeDefs: typeDefs,
  productResolvers: resolvers,
};
