import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NEXT_PUBLIC_DATABASE_URL,
      maxConcurrentQueries: 100, // Set the desired value
    },
},
});

export default prisma;