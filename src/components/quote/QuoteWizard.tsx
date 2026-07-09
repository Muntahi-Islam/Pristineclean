"use client";

import { useState } from "react";
import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { quoteSchema, type QuoteInput } from "@/schemas/quote";
import { submitQuote } from "@/actions/quote";
import { StepService } from "./StepService";
import { StepPropertyType } from "./StepPropertyType";
import { StepPropertyDetails } from "./StepPropertyDetails";
import { StepFrequency } from "./StepFrequency";
import { StepDateTime } from "./StepDateTime";
import { StepAddress } from "./StepAddress";
import { StepExtras } from "./StepExtras";
import { StepUpload } from "./StepUpload";
import { StepInfo } from "./StepInfo";
import { StepReview } from "./StepReview";
import { StepConfirmation } from "./StepConfirmation";
import { Check } from "lucide-react";

const totalSteps = 10;

const defaultValues: QuoteInput = {
  service: "",
  propertyType: "RESIDENTIAL",
  bedrooms: 1,
  bathrooms: 1,
  squareFootage: undefined,
  frequency: "",
  preferredDate: "",
  preferredTime: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  extras: [],
  images: [],
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  company: "",
  notes: "",
};

const steps = [
  "Select Service",
  "Property Type",
  "Property Details",
  "Frequency",
  "Date & Time",
  "Address",
  "Extras",
  "Uploads",
  "Your Info",
  "Review",
];

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{
    requestId: string;
  } | null>(null);

  const methods = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema) as unknown as Resolver<QuoteInput>,
    defaultValues,
    mode: "onChange",
  });

  const handleNext = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await methods.trigger(fields as (keyof QuoteInput)[]);
    if (isValid) setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = methods.getValues();
    const result = await submitQuote(data);
    setIsSubmitting(false);

    if (result.success && result.requestId) {
      setSubmitted({ requestId: result.requestId });
    }
  };

  if (submitted) {
    return <StepConfirmation requestId={submitted.requestId} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => i <= step && setStep(i)}
                disabled={i > step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  i < step
                    ? "bg-blue-600 text-white"
                    : i === step
                    ? "bg-navy-900 text-white"
                    : "bg-navy-200 text-navy-500"
                } ${i <= step ? "cursor-pointer" : "cursor-default"}`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </button>
              {i < totalSteps - 1 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-1 transition-colors ${
                    i < step ? "bg-blue-600" : "bg-navy-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-navy-500 mt-3">
          {steps[step]} — Step {step + 1} of {totalSteps}
        </p>
      </div>

      <FormProvider {...methods}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 0 && <StepService />}
            {step === 1 && <StepPropertyType />}
            {step === 2 && <StepPropertyDetails />}
            {step === 3 && <StepFrequency />}
            {step === 4 && <StepDateTime />}
            {step === 5 && <StepAddress />}
            {step === 6 && <StepExtras />}
            {step === 7 && <StepUpload />}
            {step === 8 && <StepInfo />}
            {step === 9 && (
              <StepReview
                onBack={handleBack}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </FormProvider>

      <div className="flex justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="px-6 py-3 text-sm font-medium text-navy-600 transition-colors hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-navy-900 text-white text-sm font-medium transition-all hover:bg-navy-800"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 text-white text-sm font-medium transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Quote Request"}
          </button>
        )}
      </div>
    </div>
  );
}

function getFieldsForStep(step: number): (keyof QuoteInput)[] {
  switch (step) {
    case 0:
      return ["service"];
    case 1:
      return ["propertyType"];
    case 2:
      return ["bedrooms", "bathrooms", "squareFootage"];
    case 3:
      return ["frequency"];
    case 4:
      return ["preferredDate", "preferredTime"];
    case 5:
      return ["street", "city", "state", "zipCode"];
    case 6:
      return ["extras"];
    case 7:
      return ["images"];
    case 8:
      return ["customerName", "customerEmail", "customerPhone", "company", "notes"];
    default:
      return [];
  }
}
