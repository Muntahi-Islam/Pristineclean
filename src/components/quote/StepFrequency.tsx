"use client";

import { useFormContext } from "react-hook-form";
import { FREQUENCIES } from "@/lib/constants";
import type { QuoteInput } from "@/schemas/quote";

export function StepFrequency() {
  const { register, watch } = useFormContext<QuoteInput>();
  const selected = watch("frequency");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        How often do you need cleaning?
      </h2>
      <p className="text-navy-500 mb-8">
        Choose a schedule that works for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FREQUENCIES.map((freq) => (
          <label
            key={freq.value}
            className={`relative p-6 border-2 cursor-pointer transition-all ${
              selected === freq.value
                ? "border-blue-600 bg-blue-50/50"
                : "border-navy-200 hover:border-navy-400 bg-white"
            }`}
          >
            <input
              type="radio"
              value={freq.value}
              {...register("frequency")}
              className="sr-only"
            />
            <h3 className="font-semibold text-navy-900">{freq.label}</h3>
          </label>
        ))}
      </div>
    </div>
  );
}
