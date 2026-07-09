"use client";

import { useFormContext } from "react-hook-form";
import { SERVICES } from "@/lib/constants";
import type { QuoteInput } from "@/schemas/quote";

export function StepService() {
  const { register, watch, setValue } = useFormContext<QuoteInput>();
  const selected = watch("service");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        What service do you need?
      </h2>
      <p className="text-navy-500 mb-8">
        Select the cleaning service that best fits your needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map((service) => (
          <label
            key={service.slug}
            className={`relative p-6 border-2 cursor-pointer transition-all ${
              selected === service.title
                ? "border-navy-600 bg-navy-50/50"
                : "border-navy-200 hover:border-navy-400 bg-white"
            }`}
          >
            <input
              type="radio"
              {...register("service")}
              value={service.title}
              className="sr-only"
              onChange={() => setValue("service", service.title)}
            />
            <h3 className="font-semibold text-navy-900 mb-1">
              {service.title}
            </h3>
            <p className="text-sm text-navy-500 line-clamp-2">
              {service.description}
            </p>
          </label>
        ))}
      </div>
    </div>
  );
}
