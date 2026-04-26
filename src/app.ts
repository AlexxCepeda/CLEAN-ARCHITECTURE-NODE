import { envs } from './config';
import { ServerRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  //TODO: async database

  //TODO; initialize server
  const server = new Server({ port: envs.PORT, routes: ServerRoutes.routes });
  await server.start();
}
