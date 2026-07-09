import { prisma } from "../src/lib/prisma";
import { hashPassword } from "@better-auth/utils/password";

async function main() {
  const email = "admintoricleaning@gmail.com";
  const password = "admin@123";
  const name = "Admin";

  // Remove existing user if present
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.account.deleteMany({ where: { userId: existing.id } });
    await prisma.session.deleteMany({ where: { userId: existing.id } });
    await prisma.user.delete({ where: { email } });
    console.log(`Removed old user ${email}`);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: true,
    },
  });

  // Create a matching credential account for Better Auth
  await prisma.account.create({
    data: {
      userId: user.id,
      accountId: user.id,
      providerId: "credential",
      password: hashedPassword,
    },
  });

  console.log(`Admin created: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
