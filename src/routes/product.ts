import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Product } from "../services/product";

type GetByBrandIdType = {
  brandId: string;
};

export const productRoutes =
  (product: Product) => async (fastify: FastifyInstance) => {
    fastify.get(
      "/product/:brandId",
      async (
        request: FastifyRequest<{ Params: GetByBrandIdType }>,
        reply: FastifyReply,
      ) => {
        const { brandId } = request.params;
        const products = product.getProductEntitiesByBrand(brandId);
        reply.send(products);
      },
    );
  };
