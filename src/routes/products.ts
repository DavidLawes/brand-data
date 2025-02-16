import type { FastifyInstance } from "fastify";
import { Store } from "../models/stores/store.type";
import { ProductService } from "../services/products";
import { Cache } from "../middleware/cache";

interface IParams {
  productId: string;
}

interface IReply {
  200: Store[];
  404: string;
}

export const productsRoutes =
  (productService: ProductService, cache: Cache) => async (fastify: FastifyInstance) => {
    fastify.get<{
      Params: IParams;
      Reply: IReply;
    }>("/products/:productId/stores", async (request, reply) => {
      const { productId } = request.params;

      const cacheKey = `${productId}-stores`
      const cachedResult = await cache.get(cacheKey);
      if (cachedResult) {
        request.log.info(
          `Successfully found stores for productId from cache: ${productId}`,
        );
        return reply.code(200).send(JSON.parse(cachedResult) as Store[]);
      }
      
      const stores = productService.getStoreEntities(productId);
      request.log.info(`Successfully found stores for productId: ${productId}`);
      await cache.set(cacheKey, JSON.stringify(stores));
      reply.code(200).send(stores);
    });
  };
