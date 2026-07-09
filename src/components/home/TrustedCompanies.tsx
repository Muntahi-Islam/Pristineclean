"use client";

import { AnimatedSection } from "@/components/common/AnimatedSection";

const companies = [
  "LUXURY LIVING",
  "PREMIER REALTY",
  "ELITE HOMES",
  "CORPORATE SUITES",
  "BOUTIQUE HOTELS",
  "DESIGN STUDIO",
];

export function TrustedCompanies() {
  return (
    <section className="section-padding bg-warm-100/50">
      <AnimatedSection className="container-main">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-navy-400 mb-10">
          Trusted by leading companies
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company) => (
            <div
              key={company}
              className="flex items-center justify-center h-12"
            >
              <span className="text-lg font-bold text-navy-300/60 tracking-wider">
                {company}
              </span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
