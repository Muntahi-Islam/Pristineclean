import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/common/Counter";
import Link from "next/link";
import { ArrowRight, Shield, Heart, Leaf, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Tori's Cleaning Service, our story, values, and commitment to professional cleaning services in Houston, TX.",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Reliability",
    description:
      "Fully insured and bonded with rigorous background checks on every team member.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your satisfaction drives everything we do. We don't rest until you're delighted.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description:
      "Committed to sustainable practices and eco-friendly cleaning products.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Meticulous training, professional equipment, and uncompromising quality standards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-warm-50">
        <div className="container-main">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-600">
              About Us
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold text-navy-900 leading-tight">
              Elevating Clean to{" "}
              <span className="text-navy-600">an Art Form</span>
            </h1>
            <p className="mt-6 text-lg text-navy-500 leading-relaxed">
              Tori&apos;s Cleaning Service was founded with a simple mission:
              transform cleaning from a chore into an experience. We believe
              that a spotless environment enhances well-being, productivity,
              and quality of life.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] bg-navy-100">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80)",
                }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-navy-900 mb-6">
                Our Story
              </h2>
              <p className="text-navy-700 leading-relaxed mb-4">
                What started as a small passion project has grown into one of
                the most trusted cleaning services in the Houston area. Our
                founder, Tori, built a company centered on quality,
                reliability, and genuine care for every client.
              </p>
              <p className="text-navy-700 leading-relaxed mb-6">
                Today, we serve hundreds of satisfied clients — from cozy
                homes to busy commercial spaces. Every team member shares our
                commitment to excellence.
              </p>

              <div className="grid grid-cols-3 gap-8 py-8 border-t-2 border-navy-100">
                {[
                  { value: 5, suffix: "+", label: "Years" },
                  { value: 500, suffix: "+", label: "Clients" },
                  { value: 10, suffix: "+", label: "Team" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-navy-600">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-navy-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-50">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-navy-500">
              The principles that guide every clean we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white border-2 border-navy-100 p-8"
              >
                <value.icon size={28} className="text-navy-600 mb-4" />
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-900 text-warm-50">
        <div className="container-main text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-warm-300 mb-8">
            Join our family of satisfied customers and discover what
            professional cleaning truly means.
          </p>
          <Link href="/quote-booking">
            <Button variant="white" size="lg">
              Get Your Free Quote <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
