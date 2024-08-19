const typeDefs = `#graphql    #ini wajib tambahkan paling awal
  type Product {
    id: ID
    name: String
    price: Int
    quantity: Int
    createdAt: String
  }
`;

const resolvers = {};

module.exports = {
  productTypeDefs: typeDefs,
  productResolvers: resolvers,
};
