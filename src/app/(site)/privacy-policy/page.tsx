import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PristineClean privacy policy.",
};

export default function PrivacyPolicy() {
  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy-900 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-navy max-w-none space-y-6 text-navy-700 leading-relaxed">
          <p>
            Last updated: January 2026
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, including your
            name, email address, phone number, and service address when you
            request a quote or contact us.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, to process your requests, and to communicate with you
            about your account and our services.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            3. Information Sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share information with trusted service providers who
            assist us in operating our business, subject to confidentiality
            agreements.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            4. Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction.
          </p>
          <h2 className="text-xl font-semibold text-navy-900 mt-8">
            5. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at hello@pristineclean.com.
          </p>
        </div>
      </div>
    </div>
  );
}
