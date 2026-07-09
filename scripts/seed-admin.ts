import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@pristineclean.com";
  const password = "admin123";
  const name = "Admin";

  // Check if user already exists in Better Auth
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin user already exists:", email);
    return;
  }

  // Better Auth handles password hashing via its signup API.
  // For a direct seed, we need to use the Better Auth API.
  // Instead, print instructions.
  console.log(`
Admin user not found. To create one, start the dev server and visit:

  http://localhost:3000/admin/login

Then sign up with:
  Email: ${email}
  Password: ${password}
  Name: ${name}

After signup, run this to promote the user to admin:

  npx tsx scripts/promote-admin.ts ${email}
`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
