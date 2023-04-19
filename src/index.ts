import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import { TypeBoxTypeProvider, Type } from "@fastify/type-provider-typebox";

const fastify = Fastify({
  ajv: {
    customOptions: {
      strict: "log",
      keywords: ["kind", "modifier"],
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifySwagger, {
  swagger: {},
});

fastify.route({
  method: "GET",
  url: "/route",
  schema: {
    querystring: Type.Object({
      foo: Type.Number(),
    }),
    response: {
      204: { type: "string" },
      400: {
        type: "string",
      },
    },
  },
  handler: (request, reply) => {
    // type Query = { foo: number, bar: string }
    const { foo } = request.query; // type safe!

    reply.status(204).send(3);
  },
});

fastify.ready().then(() => {
  fastify.swagger();
  fastify.listen(3001);
});
