import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const cols = await prisma.$queryRawUnsafe(
    "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='Session' ORDER BY ordinal_position"
  );
  console.log("Session columns:", JSON.stringify(cols, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
