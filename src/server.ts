import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/hello", async (_request, _reply) => {
  return "world\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
