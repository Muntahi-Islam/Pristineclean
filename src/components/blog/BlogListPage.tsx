"use client";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

const posts = [
  {
    slug: "spring-cleaning-tips",
    title: "Essential Spring Cleaning Tips for a Fresh Home",
    excerpt:
      "Transform your living space with our comprehensive spring cleaning guide. From decluttering to deep cleaning, we cover it all.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    category: "Tips",
    author: "Tori's Cleaning Team",
    readingTime: 5,
    createdAt: new Date("2026-06-15"),
  },
  {
    slug: "eco-friendly-cleaning",
    title: "The Benefits of Eco-Friendly Cleaning Products",
    excerpt:
      "Discover why switching to green cleaning products is better for your health, your home, and the planet.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    category: "Eco",
    author: "Tori's Cleaning Team",
    readingTime: 4,
    createdAt: new Date("2026-05-28"),
  },
  {
    slug: "office-cleaning-guide",
    title: "How to Maintain a Spotless Office Environment",
    excerpt:
      "A clean office boosts productivity and makes a great impression. Learn our professional strategies.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    category: "Commercial",
    author: "Tori's Cleaning Team",
    readingTime: 6,
    createdAt: new Date("2026-05-10"),
  },
  {
    slug: "carpet-care-tips",
    title: "Extend the Life of Your Carpets with Professional Care",
    excerpt:
      "Regular professional cleaning can double the life of your carpets. Here's what you need to know.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    category: "Tips",
    author: "Tori's Cleaning Team",
    readingTime: 4,
    createdAt: new Date("2026-04-22"),
  },
  {
    slug: "move-in-cleaning-checklist",
    title: "Ultimate Move-In Cleaning Checklist",
    excerpt:
      "Don't miss a spot when moving into your new home. Our comprehensive checklist ensures nothing is overlooked.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18f6bff2e?w=600&q=80",
    category: "Moving",
    author: "Tori's Cleaning Team",
    readingTime: 7,
    createdAt: new Date("2026-04-05"),
  },
  {
    slug: "kitchen-deep-cleaning",
    title: "Step-by-Step Kitchen Deep Cleaning Guide",
    excerpt:
      "From appliances to cabinets, learn how to deep clean every part of your kitchen effectively.",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80",
    category: "Deep Clean",
    author: "Tori's Cleaning Team",
    readingTime: 6,
    createdAt: new Date("2026-03-18"),
  },
];

export function BlogListPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group bg-white border-2 border-navy-100 overflow-hidden transition-all duration-300 hover:border-navy-600 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${post.image})` }}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs text-navy-400 mb-3">
              <span className="font-medium text-navy-600 uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-navy-500 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-navy-400">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
