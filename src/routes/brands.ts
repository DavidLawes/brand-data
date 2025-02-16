import type { FastifyInstance } from "fastify";
import { BrandService } from "../services/brands";
import { Product } from "../models/products/product.type";
import { Cache } from "../middleware/cache";

interface IParams {
  brandId: string;
}

interface IReply {
  200: Product[];
  404: string;
}

export const brandsRoutes =
  (brandService: BrandService, cache: Cache) =>
  async (fastify: FastifyInstance) => {
    fastify.get<{
      Params: IParams;
      Reply: IReply;
    }>("/brands/:brandId/products", async (request, reply) => {
      const { brandId } = request.params;

      const cacheKey = `${brandId}-products`;
      const cachedResult = await cache.get(cacheKey);
      if (cachedResult) {
        request.log.info(
          `Successfully found products for brandId from cache: ${brandId}`,
        );
        return reply.code(200).send(JSON.parse(cachedResult) as Product[]);
      }

      const products = brandService.getProductEntities(brandId);
      request.log.info(`Successfully found products for brandId: ${brandId}`);

      await cache.set(cacheKey, JSON.stringify(products));
      reply.code(200).send(products);
    });
  };
