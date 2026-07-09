"use client";

import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    content:
      "Exceptional attention to detail. Every corner of our home was spotless. The team was professional, punctual, and thorough.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Property Manager",
    content:
      "We manage multiple properties and Tori's Cleaning handles all our cleaning. Consistent quality and reliable service.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Business Owner",
    content:
      "Our office has never looked better. The team works around our schedule and the results are outstanding.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-warm-100/50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it. Here's what our customers have to say."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white border-2 border-navy-100 p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-navy-600 text-navy-600" />
                ))}
              </div>
              <p className="text-navy-700 leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-navy-900">{testimonial.name}</p>
                <p className="text-sm text-navy-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
