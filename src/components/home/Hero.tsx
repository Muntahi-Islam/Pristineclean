"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Star, Check } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-warm-50">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-bl from-navy-600/8 to-transparent" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-navy-600/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-navy-900/5 rounded-full blur-3xl" />

      <div className="relative container-main pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-navy-600/10 text-navy-600 px-4 py-2 text-sm font-medium mb-6">
              <Sparkles size={16} />
              Professional Cleaning Excellence
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-navy-900 leading-[1.05] tracking-tight">
              Your Space,{" "}
              <span className="text-navy-600">Immaculately</span>
              <br />
              Maintained
            </h1>

            <p className="mt-5 text-base sm:text-lg text-navy-500 leading-relaxed max-w-lg">
              Professional cleaning services you can trust. We don&apos;t just clean — we restore, refresh, and revitalize your environment with meticulous attention to detail.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
              <Link href="/quote-booking" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto justify-center">
                  Get Your Free Quote
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services/residential-cleaning" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto justify-center">
                  Explore Services
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8 mt-10">
              {[
                { icon: Shield, text: "Insured & Bonded" },
                { icon: Star, text: "5-Star Service" },
                { icon: Sparkles, text: "Eco-Friendly" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-navy-600">
                  <item.icon size={16} className="text-navy-600 shrink-0" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:justify-self-end w-full max-w-lg mx-auto lg:mx-0">
            <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-navy-50 via-white to-navy-100/50 border-2 border-navy-200/50 shadow-2xl shadow-navy-600/10 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-navy-600/10 rounded-full blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-navy-900/8 rounded-full blur-lg" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col">
                <div className="relative w-full flex-1 max-h-[55%] bg-gradient-to-b from-navy-100/60 to-navy-50/30 border-2 border-navy-200/50 rounded-sm overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-navy-200/40 to-white/60" />
                      <div className="absolute inset-0 flex">
                        <div className="w-1/2 h-full border-r border-navy-200/50" />
                      </div>
                      <div className="absolute inset-0 flex flex-col">
                        <div className="h-1/2 border-b border-navy-200/50" />
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-200/60 shadow-lg" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="col-span-2 bg-navy-50/60 border border-navy-200/40 rounded-sm p-2 sm:p-3 flex items-end">
                    <div className="w-full h-3/4 bg-navy-100/50 rounded-sm" />
                  </div>
                  <div className="bg-navy-50/60 border border-navy-200/40 rounded-sm p-2 sm:p-3 flex items-end">
                    <div className="w-full h-1/2 bg-navy-100/50 rounded-sm" />
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-navy-200/50 px-2.5 py-1.5 shadow-sm flex items-center gap-1.5">
                <Sparkles size={12} className="text-navy-600" />
                <span className="text-[11px] font-semibold text-navy-900">Professional</span>
              </div>

              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-navy-200/50 px-2.5 py-1.5 shadow-sm flex items-center gap-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-[11px] font-semibold text-navy-900">4.9</span>
                <span className="text-[10px] text-navy-500">(2k+)</span>
              </div>

              <div className="absolute bottom-3 right-3 space-y-1">
                {["Deep Clean", "Sanitized"].map((item) => (
                  <div key={item} className="flex items-center gap-1 bg-emerald-50/90 backdrop-blur-sm border border-emerald-200/50 px-2 py-1 shadow-sm">
                    <Check size={10} className="text-emerald-600" />
                    <span className="text-[10px] font-medium text-emerald-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white border-2 border-navy-100 shadow-lg px-4 py-3 flex items-center gap-3 max-w-[180px]">
              <div className="w-8 h-8 rounded-full bg-navy-600/10 flex items-center justify-center">
                <Shield size={16} className="text-navy-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-navy-900 leading-tight">100% Satisfaction</p>
                <p className="text-[10px] text-navy-500">or we re-clean free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm-50 to-transparent" />
    </section>
  );
}
