"use client";

import { Counter } from "@/components/common/Counter";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { STATS } from "@/lib/constants";

export function Stats() {
  return (
    <section className="section-padding bg-navy-900">
      <AnimatedSection className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white font-sans">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-warm-400 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
