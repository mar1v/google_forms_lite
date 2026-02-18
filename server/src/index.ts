import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";

async function start() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    if (req.method === "POST") {
      console.log("BODY:", req.body);
    }
    next();
  });
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

  app.listen(4000, () => {
    console.log("GraphQL server http://localhost:4000/graphql");
  });
}

start();
