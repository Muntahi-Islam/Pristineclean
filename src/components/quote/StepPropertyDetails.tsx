"use client";

import { useFormContext } from "react-hook-form";
import type { QuoteInput } from "@/schemas/quote";

export function StepPropertyDetails() {
  const { register, watch } = useFormContext<QuoteInput>();
  const propertyType = watch("propertyType");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Property Details
      </h2>
      <p className="text-navy-500 mb-8">
        Tell us about your space so we can prepare an accurate quote.
      </p>

      <div className="space-y-6">
        {propertyType === "RESIDENTIAL" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
                Bedrooms
              </label>
              <input
                type="number"
                min={0}
                max={20}
                {...register("bedrooms", { valueAsNumber: true })}
                className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none"
                placeholder="e.g., 3"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
                Bathrooms
              </label>
              <input
                type="number"
                min={0}
                max={20}
                step={0.5}
                {...register("bathrooms", { valueAsNumber: true })}
                className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none"
                placeholder="e.g., 2"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
            Approximate Square Footage
          </label>
          <input
            type="number"
            min={0}
            {...register("squareFootage", { valueAsNumber: true })}
            className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none"
            placeholder="e.g., 2000"
          />
        </div>
      </div>
    </div>
  );
}
