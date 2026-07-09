"use client";

import { useFormContext } from "react-hook-form";
import type { QuoteInput } from "@/schemas/quote";

export function StepInfo() {
  const { register } = useFormContext<QuoteInput>();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Your Information
      </h2>
      <p className="text-navy-500 mb-8">
        How can we reach you with your personalized quote?
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
              Full Name *
            </label>
            <input
              {...register("customerName")}
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
              Email Address *
            </label>
            <input
              type="email"
              {...register("customerEmail")}
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register("customerPhone")}
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
              Company (Optional)
            </label>
            <input
              {...register("company")}
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
              placeholder="Company name"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
            Additional Notes (Optional)
          </label>
          <textarea
            {...register("notes")}
            rows={4}
            className="flex w-full border-2 border-navy-200 bg-white px-4 py-3 text-navy-900 focus:border-blue-600 focus:outline-none resize-y"
            placeholder="Any special requests or details we should know..."
          />
        </div>
      </div>
    </div>
  );
}
