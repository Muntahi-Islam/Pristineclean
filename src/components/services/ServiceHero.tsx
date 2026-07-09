"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export function ServiceHero({ title, subtitle, description }: ServiceHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-warm-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-navy-900/10" />
      <div className="container-main relative">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Our Services
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold text-navy-900 leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-xl text-blue-600 font-serif italic">
            {subtitle}
          </p>
          <p className="mt-6 text-lg text-navy-500 leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="flex gap-4 mt-10">
            <Link href="/quote-booking">
              <Button variant="primary" size="lg">
                Get a Quote <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
