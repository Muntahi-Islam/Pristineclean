"use client";

import { useFormContext } from "react-hook-form";
import { TIME_SLOTS } from "@/lib/constants";
import type { QuoteInput } from "@/schemas/quote";

export function StepDateTime() {
  const { register, watch } = useFormContext<QuoteInput>();
  const selectedTime = watch("preferredTime");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Preferred Date & Time
      </h2>
      <p className="text-navy-500 mb-8">
        When would you like us to clean your space?
      </p>

      <div className="space-y-8">
        <div>
          <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
            Preferred Date
          </label>
          <input
            type="date"
            {...register("preferredDate")}
            className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">
            Preferred Time
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TIME_SLOTS.map((time) => (
              <label
                key={time}
                className={`p-3 text-center text-sm border-2 cursor-pointer transition-all ${
                  selectedTime === time
                    ? "border-blue-600 bg-blue-50/50 text-blue-600"
                    : "border-navy-200 hover:border-navy-400 bg-white text-navy-700"
                }`}
              >
                <input
                  type="radio"
                  value={time}
                  {...register("preferredTime")}
                  className="sr-only"
                />
                {time}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
