import type { Metadata } from "next";
import { FAQPage } from "@/components/faq/FAQPage";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about our cleaning services.",
};

export default function FAQ() {
  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-navy-500">
            Everything you need to know about our services.
          </p>
        </div>
        <FAQPage />
      </div>
    </div>
  );
}
