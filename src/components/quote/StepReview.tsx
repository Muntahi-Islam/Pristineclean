"use client";

import { useFormContext } from "react-hook-form";
import type { QuoteInput } from "@/schemas/quote";
import { FREQUENCIES, EXTRAS } from "@/lib/constants";

interface StepReviewProps {
  onBack: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function StepReview({ onBack, isSubmitting, onSubmit }: StepReviewProps) {
  const { watch } = useFormContext<QuoteInput>();
  const data = watch();

  const freqLabel = FREQUENCIES.find((f) => f.value === data.frequency)?.label ?? data.frequency;
  const selectedExtras = EXTRAS.filter((e) => data.extras?.includes(e.id));

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Review Your Request
      </h2>
      <p className="text-navy-500 mb-8">
        Please review your information before submitting.
      </p>

      <div className="space-y-4">
        <Row label="Service" value={data.service} />
        <Row label="Property Type" value={data.propertyType} />
        {data.bedrooms ? <Row label="Bedrooms" value={String(data.bedrooms)} /> : null}
        {data.bathrooms ? <Row label="Bathrooms" value={String(data.bathrooms)} /> : null}
        {data.squareFootage ? <Row label="Square Footage" value={`${data.squareFootage} sq ft`} /> : null}
        <Row label="Frequency" value={freqLabel} />
        <Row label="Date" value={data.preferredDate} />
        <Row label="Time" value={data.preferredTime} />
        <Row label="Address" value={`${data.street}, ${data.city}, ${data.state} ${data.zipCode}`} />
        {selectedExtras.length > 0 && (
          <Row label="Extras" value={selectedExtras.map((e) => e.label).join(", ")} />
        )}
        <Row label="Name" value={data.customerName} />
        <Row label="Email" value={data.customerEmail} />
        <Row label="Phone" value={data.customerPhone} />
        {data.company && <Row label="Company" value={data.company} />}
        {data.notes && <Row label="Notes" value={data.notes} />}
      </div>

      <div className="mt-8 p-4 bg-amber-50 border-2 border-amber-200">
        <p className="text-sm text-amber-800">
          By submitting, you agree to our Privacy Policy and Terms of Service.
          We will review your request and contact you within 24 hours with a
          personalized quote. No payment is required at this stage.
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="px-8 py-3 border-2 border-navy-200 text-navy-700 font-medium hover:border-navy-400 transition-all"
        >
          Edit Details
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 py-3 bg-blue-600 text-white font-semibold transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Quote Request"}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-navy-100">
      <span className="text-sm text-navy-500">{label}</span>
      <span className="text-sm font-medium text-navy-900 text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}
