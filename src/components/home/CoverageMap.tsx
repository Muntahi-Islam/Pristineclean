"use client";

import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { MapPin } from "lucide-react";

const areas = [
  "Houston",
  "Humble",
  "Katy",
  "Sugar Land",
  "Pearland",
  "Spring",
  "The Woodlands",
  "Pasadena",
];

export function CoverageMap() {
  return (
    <section className="section-padding bg-navy-900 text-warm-50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="Coverage Area"
          title="Serving the Houston Area"
          description="We bring our professional service to neighborhoods across the greater Houston area."
        />

        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] bg-navy-800 border-2 border-navy-700 flex items-center justify-center mb-10">
            <div className="text-center">
              <MapPin size={48} className="mx-auto text-navy-300 mb-4" />
              <p className="text-navy-400 text-sm">
                Interactive map integration ready
              </p>
              <p className="text-navy-500 text-xs mt-2">
                Google Maps API key required
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {areas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 text-sm text-warm-300"
              >
                <MapPin size={14} className="text-navy-300 shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
