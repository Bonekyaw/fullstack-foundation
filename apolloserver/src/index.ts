import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const Books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    price: 29.99,
  },
  { id: 2, title: "Jurassic Park", author: "Michael Crichton", price: 19.99 },
];

const typeDefs = `#graphql
 type Book {
    id: ID!
    title: String!
    author: String!
    price: Float
 }
 
 type Query {
    books: [Book]
 }`;

const resolvers = {
  Query: {
    books: () => Books,
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server);
  console.log(`🚀  Server is running at: ${url}`);
}

startApolloServer();
