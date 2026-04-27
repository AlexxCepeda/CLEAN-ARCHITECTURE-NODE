import { defineConfig } from 'drizzle-kit';
import { envs } from './src/config';

export default defineConfig({
  out: './drizzle',
  schema: './src/data/postgresql/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: envs.DATABASE_URL,
  },
});
