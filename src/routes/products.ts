import type { FastifyInstance } from "fastify";
import { Store } from "../models/stores/store.type";
import { ProductService } from "../services/products";

interface IParams {
  productId: string;
}

interface IReply {
  200: Store[];
  404: string;
}

export const productsRoutes =
  (productService: ProductService) => async (fastify: FastifyInstance) => {
    fastify.get<{
      Params: IParams;
      Reply: IReply;
    }>("/products/:productId/stores", async (request, reply) => {
      const { productId } = request.params;
      const products = productService.getStoreEntities(productId);
      request.log.info(`Successfully found stores for productId: ${productId}`);
      reply.code(200).send(products);
    });
  };
