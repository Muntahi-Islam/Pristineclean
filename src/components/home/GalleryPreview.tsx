"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    alt: "Clean living room",
    size: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80",
    alt: "Clean kitchen",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
    alt: "Clean bathroom",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    alt: "Clean office",
    size: "medium",
  },
];

export function GalleryPreview() {
  return (
    <section className="section-padding bg-warm-50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="Gallery"
          title="Our Work Speaks"
          description="A glimpse into the spaces we transform."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${
                i === 0 ? "row-span-2" : ""
              }`}
            >
              <div
                className="w-full h-full min-h-[200px] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery">
            <Button variant="outline">
              View Full Gallery <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
