import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { join } from "path";

// local components import
import { schema } from "./schema";

const port = process.env.PORT || 4000;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );

  return { server, app };
}

startApolloServer();
