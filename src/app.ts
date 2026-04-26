import { Server } from "./presentation/server.js";

(() => {
  main();
})();

async function main() {
  //TODO: async database

  //TODO; initialize server
  const server = new Server({ port: 3100 });
  await server.start();
}
