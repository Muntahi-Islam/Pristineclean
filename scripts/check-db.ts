import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.$queryRawUnsafe(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
  );
  console.log("Tables:", JSON.stringify(tables, null, 2));

  const userCols = await prisma.$queryRawUnsafe(
    "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='User' ORDER BY ordinal_position"
  );
  console.log("User columns:", JSON.stringify(userCols, null, 2));

  const sessionCols = await prisma.$queryRawUnsafe(
    "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='Session' ORDER BY ordinal_position"
  );
  console.log("Session columns:", JSON.stringify(sessionCols, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
