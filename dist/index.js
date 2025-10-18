"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// import { AbortController } from "node:abort-controller";
const node_util_1 = require("node:util");
const server = (0, fastify_1.default)({ logger: true });
server.get("/me", async (request, reply) => {
    const user = {
        email: "kingsleydaprime@gmail.com",
        name: "Kingsley Ihemelandu",
        stack: "Node.js/Fastify",
    };
    const timestamp = new Date().toISOString();
    let fact = "";
    try {
        const abortController = (0, node_util_1.transferableAbortController)();
        const timeoutId = setTimeout(() => abortController.abort(), 5000);
        const response = await (0, node_fetch_1.default)("https://catfact.ninja/fact", {
            signal: abortController.signal,
        });
        clearTimeout(timeoutId);
        if (response.ok) {
            const data = (await response.json());
            fact = data.fact;
        }
    }
    catch (error) {
        server.log.error("Cat fact fetch failed:");
        server.log.error(error);
    }
    const data = {
        status: "success",
        user,
        timestamp,
        fact,
    };
    reply.status(200).send(data);
});
const start = async () => {
    try {
        await server.listen({
            port: process.env.PORT ? Number(process.env.PORT) : 3000,
            host: "0.0.0.0",
        });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map