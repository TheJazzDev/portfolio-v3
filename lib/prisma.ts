import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient as PrismaClientType } from '@/prisma/generated/internal/class';
import { PrismaClient } from '@/prisma/generated/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
  pool: Pool | undefined;
};

// Create a connection pool
const pool =
  globalForPrisma.pool ??
  new Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== 'production') globalForPrisma.pool = pool;

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
