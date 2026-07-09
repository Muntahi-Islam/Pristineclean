"use client";

import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { MapPin } from "lucide-react";

const areas = [
  "Beverly Hills",
  "Santa Monica",
  "West Hollywood",
  "Malibu",
  "Bel Air",
  "Brentwood",
  "Pacific Palisades",
  "Calabasas",
];

export function CoverageMap() {
  return (
    <section className="section-padding bg-navy-900 text-warm-50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="Coverage Area"
          title="Serving Premium Locations"
          description="We bring our premium service to the finest neighborhoods."
        />

        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] bg-navy-800 border-2 border-navy-700 flex items-center justify-center mb-10">
            <div className="text-center">
              <MapPin size={48} className="mx-auto text-blue-400 mb-4" />
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
                <MapPin size={14} className="text-blue-400 shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
