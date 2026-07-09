"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

const blogPosts = [
  {
    slug: "spring-cleaning-tips",
    title: "Essential Spring Cleaning Tips for a Fresh Home",
    excerpt:
      "Transform your living space with our comprehensive spring cleaning guide.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    category: "Tips",
    createdAt: new Date("2026-06-15"),
  },
  {
    slug: "eco-friendly-cleaning",
    title: "The Benefits of Eco-Friendly Cleaning Products",
    excerpt:
      "Discover why green cleaning is better for your health and the environment.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    category: "Eco",
    createdAt: new Date("2026-05-28"),
  },
  {
    slug: "office-cleaning-guide",
    title: "How to Maintain a Spotless Office Environment",
    excerpt:
      "Create a productive workspace with these professional cleaning strategies.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    category: "Commercial",
    createdAt: new Date("2026-05-10"),
  },
];

export function BlogPreview() {
  return (
    <section className="section-padding bg-warm-100/50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="Our Blog"
          title="Cleaning Insights & Tips"
          description="Expert advice to keep your space in spotless condition."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
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
                <div className="flex items-center gap-4 text-xs text-navy-400 mb-3">
                  <span className="font-medium text-navy-600 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog">
            <Button variant="outline">
              Read All Articles <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
