import type { FastifyInstance } from "fastify";
import { BrandService } from "../services/brands";
import { Product } from "../models/products/product.type";

interface IParams {
  brandId: string;
}

interface IReply {
  200: Product[];
  404: string;
}

export const brandsRoutes =
  (brandService: BrandService) => async (fastify: FastifyInstance) => {
    fastify.get<{
      Params: IParams;
      Reply: IReply;
    }>("/brands/:brandId/products", async (request, reply) => {
      const { brandId } = request.params;
      const products = brandService.getProductEntities(brandId);
      request.log.info(`Successfully found products for brandId: ${brandId}`);
      reply.code(200).send(products);
    });
  };
