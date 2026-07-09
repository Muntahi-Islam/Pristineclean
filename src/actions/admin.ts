"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

function serializeQuote(q: any) {
  return {
    ...q,
    estimatedValue: q.estimatedValue ? q.estimatedValue.toString() : null,
  };
}

export async function getDashboardStats() {
  try {
    const [totalQuotes, pendingQuotes, totalCustomers, recentQuotes] =
      await Promise.all([
        prisma.quote.count(),
        prisma.quote.count({ where: { status: "PENDING" } }),
        prisma.quote
          .findMany({
            select: { customerEmail: true },
            distinct: ["customerEmail"],
          })
          .then((r) => r.length),
        prisma.quote.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
      ]);

    return {
      totalQuotes,
      pendingQuotes,
      totalCustomers,
      recentQuotes: recentQuotes.map(serializeQuote),
    };
  } catch {
    return null;
  }
}

const updateQuoteStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["PENDING", "REVIEWED", "CONTACTED", "COMPLETED", "DECLINED", "CLOSED"]),
});

export async function updateQuoteStatus(formData: FormData) {
  const data = updateQuoteStatusSchema.parse({
    id: formData.get("id"),
    status: formData.get("status"),
  });

  await prisma.quote.update({
    where: { id: data.id },
    data: { status: data.status },
  });

  return { success: true };
}

export async function getQuotes(params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 20;

  const where: Record<string, unknown> = {};

  if (params?.status && params.status !== "ALL") {
    where.status = params.status;
  }

  if (params?.search) {
    where.OR = [
      { customerName: { contains: params.search, mode: "insensitive" } },
      { customerEmail: { contains: params.search, mode: "insensitive" } },
      { requestId: { contains: params.search, mode: "insensitive" } },
    ];
  }

  const [quotes, total] = await Promise.all([
    prisma.quote.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.quote.count({ where }),
  ]);

  return { quotes: quotes.map(serializeQuote), total, page, totalPages: Math.ceil(total / limit) };
}

export async function updateQuotePrice(formData: FormData) {
  const id = formData.get("id") as string;
  const value = formData.get("estimatedValue") as string;

  await prisma.quote.update({
    where: { id },
    data: { estimatedValue: value ? Number(value) : null },
  });

  return { success: true };
}
