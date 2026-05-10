const { PrismaClient } = require('@prisma/client');

// Use a singleton pattern for Prisma Client to avoid exhausting database connections
// during development when hot reloading might create multiple instances.
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;
