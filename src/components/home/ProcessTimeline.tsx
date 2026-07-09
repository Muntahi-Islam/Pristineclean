"use client";

import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Clipboard, Search, Sparkles, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Clipboard,
    title: "Request a Quote",
    description:
      "Tell us about your space and needs. Our online form makes it simple to get started.",
  },
  {
    icon: Search,
    title: "We Assess",
    description:
      "We review your requirements and prepare a tailored cleaning plan for your space.",
  },
  {
    icon: Sparkles,
    title: "Professional Cleaning",
    description:
      "Our trained team arrives on schedule with premium equipment and eco-friendly products.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "We inspect every detail and follow up to ensure your complete satisfaction.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="section-padding bg-warm-100/50">
      <AnimatedSection className="container-main">
        <SectionHeading
          label="How It Works"
          title="Simple & Transparent Process"
          description="From quote to sparkling clean — we make it effortless."
        />

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-navy-200 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-16`}
              >
                <div className="flex-1">
                  <div
                    className={`max-w-md ${
                      index % 2 === 0 ? "lg:text-right lg:ml-auto" : "lg:text-left"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                      Step 0{index + 1}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold text-navy-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-navy-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center shrink-0">
                  <step.icon size={22} className="text-blue-600" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
