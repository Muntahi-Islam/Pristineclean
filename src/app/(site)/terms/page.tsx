import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "PristineClean terms of service.",
};

export default function TermsPage() {
  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy-900 mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-navy max-w-none space-y-6 text-navy-700 leading-relaxed">
          <p>Last updated: January 2026</p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            1. Services
          </h2>
          <p>
            PristineClean provides professional cleaning services for
            residential and commercial properties. All services are subject to
            availability and agreed-upon scope of work.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            2. Quotes & Payments
          </h2>
          <p>
            Quotes are provided free of charge and are valid for 30 days. No
            payment is required at the time of quote request. Payment is due upon
            completion of services unless otherwise agreed.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            3. Cancellations & Rescheduling
          </h2>
          <p>
            Cancellations or rescheduling requests made at least 24 hours before
            the scheduled appointment incur no fee. Late cancellations may be
            subject to a fee.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            4. Satisfaction Guarantee
          </h2>
          <p>
            If you are not completely satisfied with our service, please contact
            us within 24 hours, and we will address your concerns at no
            additional cost.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            5. Liability
          </h2>
          <p>
            PristineClean is fully insured and bonded. Our liability is limited
            to the value of the service provided. Claims must be reported within
            24 hours of service completion.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            6. Contact
          </h2>
          <p>
            For questions about these terms, please contact us at
            hello@pristineclean.com.
          </p>
        </div>
      </div>
    </div>
  );
}
