import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { BrandService } from "../services/brands";

type GetByBrandIdType = {
  brandId: string;
};

export const brandsRoutes =
  (product: BrandService) => async (fastify: FastifyInstance) => {
    fastify.get(
      "/brands/:brandId/products",
      async (
        request: FastifyRequest<{ Params: GetByBrandIdType }>,
        reply: FastifyReply,
      ) => {
        const { brandId } = request.params;
        const products = product.getProductEntities(brandId);
        reply.send(products);
      },
    );
  };
