"use client";

import { useFormContext } from "react-hook-form";
import { Building2, Home } from "lucide-react";
import type { QuoteInput } from "@/schemas/quote";

export function StepPropertyType() {
  const { register, watch, setValue } = useFormContext<QuoteInput>();
  const selected = watch("propertyType");

  const types = [
    {
      value: "RESIDENTIAL",
      icon: Home,
      label: "Residential",
      description: "Homes, apartments, condos",
    },
    {
      value: "COMMERCIAL",
      icon: Building2,
      label: "Commercial",
      description: "Offices, retail, warehouses",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Property Type
      </h2>
      <p className="text-navy-500 mb-8">
        Is this for a residential or commercial property?
      </p>

      <input type="hidden" {...register("propertyType")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {types.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.value;
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => setValue("propertyType", type.value as "RESIDENTIAL" | "COMMERCIAL")}
              className={`p-8 text-left border-2 transition-all ${
                isSelected
                  ? "border-navy-600 bg-navy-50/50"
                  : "border-navy-200 hover:border-navy-400 bg-white"
              }`}
            >
              <Icon
                size={32}
                className={`mb-4 ${
                  isSelected ? "text-navy-600" : "text-navy-400"
                }`}
              />
              <h3 className="text-lg font-semibold text-navy-900 mb-1">
                {type.label}
              </h3>
              <p className="text-sm text-navy-500">{type.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
