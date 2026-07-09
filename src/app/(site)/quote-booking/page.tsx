import type { Metadata } from "next";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a free, no-obligation quote for our professional cleaning services.",
};

export default function QuoteBookingPage() {
  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-lg text-navy-500">
            Tell us about your space and we&apos;ll prepare a personalized
            cleaning quote within 24 hours.
          </p>
        </div>

        <QuoteWizard />
      </div>
    </div>
  );
}
