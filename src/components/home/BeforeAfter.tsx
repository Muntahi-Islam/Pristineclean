"use client";

import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { BeforeAfterSlider } from "@/components/common/BeforeAfterSlider";

export function BeforeAfter() {
  return (
    <section className="section-padding bg-warm-50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="Our Results"
          title="See the Difference"
          description="Transformative results that speak for themselves."
        />

        <div className="max-w-3xl mx-auto">
          <BeforeAfterSlider
            before="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
            after="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&sat=-100"
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>
      </AnimatedSection>
    </section>
  );
}
