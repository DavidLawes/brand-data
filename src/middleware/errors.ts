import { FastifyInstance } from "fastify";
import { BrandNotFoundError } from "../errors";

export const errorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler(function (error, request, reply) {
    console.log("here");
    if (error instanceof BrandNotFoundError) {
      reply.status(404).send(error.message);
    } else {
      reply.send(error);
    }
  });
};
