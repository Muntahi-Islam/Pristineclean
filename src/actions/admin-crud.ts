"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Gallery
export async function getGalleryItems() {
  return prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
}

export async function createGalleryItem(data: {
  title?: string; description?: string; image: string; category?: string; featured?: boolean; order?: number;
}) {
  const item = await prisma.galleryItem.create({
    data: { title: data.title ?? null, description: data.description ?? null, image: data.image, category: data.category ?? "general", featured: data.featured ?? false, order: data.order ?? 0, published: true },
  });
  revalidatePath("/admin/gallery");
  return item;
}

export async function updateGalleryItem(id: string, data: Partial<{ title: string; description: string; image: string; category: string; featured: boolean; order: number; published: boolean }>) {
  const item = await prisma.galleryItem.update({ where: { id }, data });
  revalidatePath("/admin/gallery");
  return item;
}

export async function deleteGalleryItem(id: string) {
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}

// Testimonials
export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function createTestimonial(data: {
  name: string; role?: string; company?: string; avatar?: string; content: string; rating?: number; featured?: boolean;
}) {
  const item = await prisma.testimonial.create({
    data: { name: data.name, role: data.role ?? null, company: data.company ?? null, avatar: data.avatar ?? null, content: data.content, rating: data.rating ?? 5, featured: data.featured ?? false, published: true, order: 0 },
  });
  revalidatePath("/admin/testimonials");
  return item;
}

export async function updateTestimonial(id: string, data: Partial<{
  name: string; role: string; company: string; avatar: string; content: string; rating: number; featured: boolean; published: boolean; order: number;
}>) {
  const item = await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/admin/testimonials");
  return item;
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}

// FAQ
export async function getFAQs() {
  return prisma.fAQ.findMany({ orderBy: { order: "asc" } });
}

export async function createFAQ(data: { question: string; answer: string; category?: string; order?: number }) {
  const item = await prisma.fAQ.create({
    data: { question: data.question, answer: data.answer, category: data.category ?? "general", order: data.order ?? 0, published: true },
  });
  revalidatePath("/admin/faq");
  return item;
}

export async function updateFAQ(id: string, data: Partial<{ question: string; answer: string; category: string; order: number; published: boolean }>) {
  const item = await prisma.fAQ.update({ where: { id }, data });
  revalidatePath("/admin/faq");
  return item;
}

export async function deleteFAQ(id: string) {
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/admin/faq");
}

// Blog
export async function getAllBlogPosts(params?: { page?: number; limit?: number }) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 50;
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
    prisma.blogPost.count(),
  ]);
  return { posts, total, page, totalPages: Math.ceil(total / limit) };
}

export async function createBlogPost(data: {
  slug: string; title: string; excerpt?: string; content: string; image?: string; category?: string; author?: string; readingTime?: number; published?: boolean; featured?: boolean;
  seoTitle?: string; seoDesc?: string; canonical?: string; ogImage?: string;
}) {
  const post = await prisma.blogPost.create({ data: { ...data, excerpt: data.excerpt ?? null, image: data.image ?? null, category: data.category ?? "general", author: data.author ?? "Admin", readingTime: data.readingTime ?? null, published: data.published ?? false, featured: data.featured ?? false, seoTitle: data.seoTitle ?? null, seoDesc: data.seoDesc ?? null, canonical: data.canonical ?? null, ogImage: data.ogImage ?? null } });
  revalidatePath("/admin/blog");
  return post;
}

export async function updateBlogPost(id: string, data: Partial<{
  slug: string; title: string; excerpt: string; content: string; image: string; category: string; author: string; readingTime: number; published: boolean; featured: boolean;
  seoTitle: string; seoDesc: string; canonical: string; ogImage: string;
}>) {
  const post = await prisma.blogPost.update({ where: { id }, data });
  revalidatePath("/admin/blog");
  return post;
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
}

// Settings
export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;
  return map;
}

export async function updateSiteSetting(key: string, value: string) {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/admin/settings");
}

export async function bulkUpdateSiteSettings(settings: Record<string, string>) {
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePath("/admin/settings");
}

// Users / Admin Approval
export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { accounts: true, sessions: true } } },
  });
}

export async function updateUserRole(userId: string, role: string) {
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin");
}

export async function deleteUser(userId: string) {
  // Delete related sessions and accounts first
  await prisma.session.deleteMany({ where: { userId } });
  await prisma.account.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin");
}
