import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { ServiceHero } from "@/components/services/ServiceHero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <>
      <ServiceHero
        title={service.title}
        subtitle={service.subtitle}
        description={service.description}
      />

      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-navy-900 mb-6">
                What&apos;s Included
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-blue-600 shrink-0 mt-0.5"
                    />
                    <span className="text-navy-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/3] bg-navy-100">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-50">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-navy-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-navy-500 mb-8">
              Request a free quote and we&apos;ll take care of the rest.
            </p>
            <Link href="/quote-booking">
              <Button variant="primary" size="xl">
                Get Your Free Quote <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <h2 className="text-2xl font-semibold text-navy-900 mb-8 text-center">
            Related Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.filter((s) => s.slug !== slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group p-6 bg-warm-50 border-2 border-navy-100 transition-all hover:border-blue-600 hover:shadow-lg"
                >
                  <h3 className="font-semibold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-navy-500 line-clamp-2">
                    {s.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
