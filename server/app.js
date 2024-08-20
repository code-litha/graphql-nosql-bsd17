require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { bookTypeDefs, bookResolvers } = require("./schemas/book");
const { productTypeDefs, productResolvers } = require("./schemas/product");
const { mongoConnect } = require("./config/mongoConnect");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const authentication = require("./utils/auth");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [bookTypeDefs, productTypeDefs, userTypeDefs],
  resolvers: [bookResolvers, productResolvers, userResolvers],
  introspection: true, // ini untuk nanti pas deploy, playgroundnya masih kebuka
});

async function listenApp() {
  try {
    await mongoConnect();
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req, res }) => {
        return {
          auth: async () => {
            return await authentication(req);
          },
          // db: () => {
          //   console.log("context db dipanggil");
          // },
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
}

listenApp();
