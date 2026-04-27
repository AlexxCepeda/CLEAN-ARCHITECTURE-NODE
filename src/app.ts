import { envs } from './config';
import { PostgresDatabase } from './data/postgresql/postgresql-db';
import { ServerRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  await PostgresDatabase.connect(envs.DATABASE_URL);

  const server = new Server({ port: envs.PORT, routes: ServerRoutes.routes });
  await server.start();
}
