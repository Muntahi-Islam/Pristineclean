"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function FinalCTA() {
  const settings = useSiteSettings();

  return (
    <section className="section-padding bg-warm-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-navy-900/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-900/5 rounded-full blur-3xl" />

      <AnimatedSection className="container-main relative">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles size={32} className="mx-auto text-blue-600 mb-6" />
          <h2 className="text-4xl md:text-5xl font-semibold text-navy-900 leading-tight">
            Ready for a Cleaner Space?
          </h2>
          <p className="mt-4 text-lg text-navy-500 max-w-lg mx-auto leading-relaxed">
            Get your free, no-obligation quote today. Join thousands of satisfied
            customers who trust us with their spaces.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/quote-booking">
              <Button size="xl" variant="primary">
                Get Your Free Quote
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <a href={`tel:${settings?.phone ?? "(555) 123-4567"}`}>
              <Button size="xl" variant="outline">
                <Phone size={20} className="mr-2" />
                {settings?.phone ?? "(555) 123-4567"}
              </Button>
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
