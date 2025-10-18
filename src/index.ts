import fastify from "fastify";
import fetch from "node-fetch";
// import { AbortController } from "node:abort-controller";
import { transferableAbortController } from "node:util";

const server = fastify({ logger: true });

server.get("/me", async (request, reply) => {
  const user = {
    email: "kingsleydaprime@gmail.com",
    name: "Kingsley Ihemelandu",
    stack: "Node.js/Fastify",
  } as const;

  const timestamp = new Date().toISOString();

  let fact: string = "";
  try {
    const abortController = transferableAbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);
    const response = await fetch("https://catfact.ninja/fact", {
      signal: abortController.signal,
    });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = (await response.json()) as { fact: string };
      fact = data.fact;
    }
  } catch (error: unknown) {
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
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
