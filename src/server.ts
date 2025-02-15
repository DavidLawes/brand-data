import Fastify, {
  FastifyInstance,
} from "fastify";

import { brandsRoutes } from "./routes/brands";
import { Brand } from "./models/brands/brand.type";

import fs from 'fs'
import path from 'path'
import { Brands } from "./models/brands";
import { BrandService } from "./services/brands";
import { errorHandler } from "./middleware/errors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Products } from "./models/products";
import { Product } from "./models/products/product.type";

// importing static data here
// could be replaced by initialising a db connection
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const json = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../mock/brands.json'),
      "utf-8",
    ),
  );

const brands = new Brands(json.data as Brand[])
const products = new Products(json.embedded.products as Product[])
const brandService = new BrandService(brands, products)

const server: FastifyInstance = Fastify({
  logger: true,
});

// middlewares
errorHandler(server)

// routes
server.register(brandsRoutes(brandService))

// healthcheck endpoint - could be used in the future
// to validate the server is running as expected
server.get("/healthcheck", async () => {
  return "OK";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
