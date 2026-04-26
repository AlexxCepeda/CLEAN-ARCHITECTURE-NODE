import { envs } from './config';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  //TODO: async database

  //TODO; initialize server
  const server = new Server({ port: envs.PORT });
  await server.start();
}
