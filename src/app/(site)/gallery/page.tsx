import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery/GalleryPage";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our portfolio of transformed spaces by Tori's Cleaning Service.",
};

export default function Gallery() {
  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            Our Work
          </h1>
          <p className="text-lg text-navy-500">
            A visual journey through the spaces we&apos;ve transformed.
          </p>
        </div>
        <GalleryPage />
      </div>
    </div>
  );
}
