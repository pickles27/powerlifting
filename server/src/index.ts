import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { resolvers } from "./resolvers";
import { pool } from "./db";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { join } from "path";

const typesArray = loadFilesSync(join(__dirname, "./schema/**/*.graphql"));
const typeDefs = mergeTypeDefs(typesArray);

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const allowedOrigins = [
    "http://localhost:5173", // Vite local development server
    process.env.CLIENT_URL,
    /\.vercel\.app$/,
  ].filter((origin): origin is string | RegExp => Boolean(origin));

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: allowedOrigins,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({ pool }),
    })
  );

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
