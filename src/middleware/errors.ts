import { FastifyInstance } from "fastify";
import { BrandNotFoundError, ProductNotFoundError } from "../errors";

export const errorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler(function (error, request, reply) {
    console.log("here");
    if (
      error instanceof BrandNotFoundError ||
      error instanceof ProductNotFoundError
    ) {
      reply.status(404).send(error.message);
    } else {
      reply.send(error);
    }
  });
};
