"use client";

import { useFormContext } from "react-hook-form";
import { EXTRAS } from "@/lib/constants";
import type { QuoteInput } from "@/schemas/quote";
import { Check } from "lucide-react";

export function StepExtras() {
  const { watch, setValue } = useFormContext<QuoteInput>();
  const extras = watch("extras") ?? [];

  const toggleExtra = (id: string) => {
    const current = watch("extras") ?? [];
    if (current.includes(id)) {
      setValue("extras", current.filter((e) => e !== id));
    } else {
      setValue("extras", [...current, id]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Additional Services
      </h2>
      <p className="text-navy-500 mb-8">
        Add any extra services you need (each at an additional cost).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXTRAS.map((item) => {
          const isSelected = extras.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleExtra(item.id)}
              className={`flex items-center justify-between p-5 border-2 text-left transition-all ${
                isSelected
                  ? "border-navy-600 bg-navy-50/50"
                  : "border-navy-200 hover:border-navy-400 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-navy-600 border-navy-600"
                      : "border-navy-300"
                  }`}
                >
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
                <span className="font-medium text-navy-900">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-navy-600">
                ${item.price}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
