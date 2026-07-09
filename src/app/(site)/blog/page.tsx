import type { Metadata } from "next";
import { BlogListPage } from "@/components/blog/BlogListPage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Cleaning tips, guides, and insights from the Tori's Cleaning Service team.",
};

export default function Blog() {
  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-navy-500">
            Expert cleaning insights, tips, and guides for maintaining a spotless space.
          </p>
        </div>
        <BlogListPage />
      </div>
    </div>
  );
}
