import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getClient() {
  await prisma.$connect();
  return prisma;
}

