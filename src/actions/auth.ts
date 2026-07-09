"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function signUpAdmin(email: string, password: string, name: string) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const data = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email,
        password,
        name,
      },
    });

    // Promote to admin
    if (data?.user) {
      await prisma.user.update({
        where: { id: data.user.id },
        data: { role: "ADMIN" },
      });
    }

    return { success: true, data };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Failed to create admin" };
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
