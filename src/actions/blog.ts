"use server";

import { prisma } from "@/lib/prisma";

export async function getBlogPosts(params?: {
  category?: string;
  page?: number;
  limit?: number;
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 9;

  const where: Record<string, unknown> = { published: true };

  if (params?.category && params.category !== "all") {
    where.category = params.category;
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        image: true,
        category: true,
        author: true,
        readingTime: true,
        createdAt: true,
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });
    return post;
  } catch {
    return null;
  }
}

export async function getBlogCategories() {
  const categories = await prisma.blogPost.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  return categories.map((c) => c.category);
}

export async function getRelatedPosts(slug: string, category: string) {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      category,
      slug: { not: slug },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      image: true,
      createdAt: true,
    },
  });
  return posts;
}
