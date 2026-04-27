import { drizzle } from 'drizzle-orm/node-postgres';

export class PostgresDatabase {
  private static db: ReturnType<typeof drizzle>;

  static async connect(databaseUrl: string) {
    try {
      this.db = drizzle(databaseUrl);
      await this.db.execute('SELECT 1');
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection failed', error);
      throw error;
    }
  }

  static getInstance(): ReturnType<typeof drizzle> {
    if (!this.db)
      throw new Error('Database not connected, call connect() first');
    return this.db;
  }
}
