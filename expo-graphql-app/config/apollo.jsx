import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: 'http://localhost:4000', // jika pakai macbook & simulator iOS
  uri: "https://d6h8mss5-4000.asse.devtunnels.ms/",
  cache: new InMemoryCache(),
});

export default client;
