"use client";

import { useFormContext } from "react-hook-form";
import type { QuoteInput } from "@/schemas/quote";

export function StepAddress() {
  const { register } = useFormContext<QuoteInput>();

  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Your Address
      </h2>
      <p className="text-navy-500 mb-8">
        Where should we bring our cleaning service?
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
            Street Address
          </label>
          <input
            {...register("street")}
            className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
            placeholder="123 Luxury Lane"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
              City
            </label>
            <input
              {...register("city")}
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
              placeholder="Beverly Hills"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
              State
            </label>
            <select
              {...register("state")}
              className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select state</option>
              {usStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="max-w-xs">
          <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
            ZIP Code
          </label>
          <input
            {...register("zipCode")}
            className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
            placeholder="90210"
          />
        </div>
      </div>
    </div>
  );
}
