import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for our premium cleaning services.",
};

const plans = [
  {
    name: "Basic Clean",
    price: "Call for Quote",
    description: "Essential cleaning for regular maintenance",
    features: [
      "Dusting & wiping surfaces",
      "Vacuum & mop floors",
      "Kitchen & bathroom cleaning",
      "Trash removal",
    ],
  },
  {
    name: "Standard Clean",
    price: "Call for Quote",
    description: "Our most popular comprehensive clean",
    features: [
      "Everything in Basic",
      "Deep kitchen cleaning",
      "Inside appliances",
      "Window sills & tracks",
      "Baseboards & trim",
    ],
    featured: true,
  },
  {
    name: "Premium Clean",
    price: "Call for Quote",
    description: "Our most thorough cleaning experience",
    features: [
      "Everything in Standard",
      "Inside cabinets & drawers",
      "Carpet shampooing",
      "Window cleaning (interior)",
      "Wall spot cleaning",
      "Complete home sanitation",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-warm-50">
        <div className="container-main text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Pricing
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-navy-500 max-w-xl mx-auto">
            Every space is unique, so we provide personalized quotes. Here&apos;s
            a general overview of our service tiers.
          </p>
        </div>
      </section>

      <section className="section-padding bg-warm-50 -mt-20">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white border-2 p-8 transition-all hover:shadow-xl ${
                  plan.featured
                    ? "border-blue-600 shadow-lg"
                    : "border-navy-100 hover:border-blue-600"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider px-4 py-1">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-navy-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-navy-500 mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-2xl font-bold text-navy-900">
                    {plan.price}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-navy-700">
                      <CheckCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/quote-booking">
                  <Button
                    variant={plan.featured ? "primary" : "outline"}
                    className="w-full"
                  >
                    Get a Quote <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 max-w-lg mx-auto">
            <p className="text-sm text-navy-500">
              Prices vary based on property size, condition, and location.
              Contact us for a precise, no-obligation quote tailored to your
              specific needs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
