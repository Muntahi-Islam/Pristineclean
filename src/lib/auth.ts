import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "@better-auth/prisma-adapter";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "User",
  },
  session: {
    modelName: "Session",
    fields: {
      token: "token",
      expiresAt: "expiresAt",
      ipAddress: "ipAddress",
      userAgent: "userAgent",
    },
  },
  account: {
    modelName: "Account",
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"],
});
