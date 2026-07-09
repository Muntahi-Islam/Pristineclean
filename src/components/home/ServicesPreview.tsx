"use client";

import Link from "next/link";
import { ArrowRight, Home, Building2, Sparkles, Truck, Ruler, Scan } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  building: Building2,
  sparkles: Sparkles,
  truck: Truck,
  carpet: Ruler,
  window: Scan,
};

export function ServicesPreview() {
  return (
    <section className="section-padding bg-warm-50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="Our Services"
          title="Premium Cleaning Solutions"
          description="Comprehensive cleaning services tailored to your specific needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative bg-white border-2 border-navy-100 p-8 transition-all duration-300 hover:border-blue-600 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-blue-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed mb-6 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
}
