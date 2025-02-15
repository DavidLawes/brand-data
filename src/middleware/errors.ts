import { FastifyInstance } from "fastify";
import { BrandNotFoundError, ProductNotFoundError } from "../errors";

export const errorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler(function (error, request, reply) {
    if (
      error instanceof BrandNotFoundError ||
      error instanceof ProductNotFoundError
    ) {
      request.log.error(`Handled error: ${error.message}`);
      reply.status(404).send(error.message);
    } else {
      request.log.error(`Unhandled error: ${error.message}`);
      reply.send(error);
    }
  });
};
