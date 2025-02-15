import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import { productRoutes } from "./routes/product";
import { Brand } from "./models/brands/brand.type";

import fs from 'fs'
import path from 'path'
import { Brands } from "./models/brands";
import { Product } from "./services/product";
import { errorHandler } from "./middleware/errors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// importing static data here
// could be replaced by initialising a db connection
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const data: Brand[] = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../mock/brands.json'),
      "utf-8",
    ),
  ).data;

const brands = new Brands(data)
const productService = new Product(brands)

const server: FastifyInstance = Fastify({
  logger: true,
});

// middlewares
errorHandler(server)

// routes
server.register(productRoutes(productService))

// healthcheck endpoint - could be used in the future
// to validate the server is running as expected
server.get("/healthcheck", async (_request: FastifyRequest, _reply: FastifyReply) => {
  return "OK";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
