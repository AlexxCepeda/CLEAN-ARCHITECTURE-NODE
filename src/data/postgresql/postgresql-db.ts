import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './../../../generated/prisma/client';

export class PostgresDatabase {
  private static prisma: PrismaClient;

  static async connect(databaseUrl: string) {
    try {
      const adapter = new PrismaPg({
        connectionString: databaseUrl,
      });
      this.prisma = new PrismaClient({ adapter });
      await this.prisma.$connect();
      await this.prisma.$queryRaw`SELECT 1`;
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection failed', error);
      throw error;
    }
  }

  static getInstance(): PrismaClient {
    if (!this.prisma)
      throw new Error('Database not connected, call connect() first');
    return this.prisma;
  }
}
