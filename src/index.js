"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const fastify = (0, fastify_1.default)({
    ajv: {
        customOptions: {
            strict: "log",
            keywords: ["kind", "modifier"],
        },
    },
}).withTypeProvider();
fastify.register(swagger_1.default, {
    swagger: {},
});
fastify.route({
    method: "GET",
    url: "/route",
    schema: {
        querystring: type_provider_typebox_1.Type.Object({
            foo: type_provider_typebox_1.Type.Number(),
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
