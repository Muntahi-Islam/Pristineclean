"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepConfirmationProps {
  requestId: string;
}

export function StepConfirmation({ requestId }: StepConfirmationProps) {
  return (
    <div className="text-center py-16 max-w-lg mx-auto">
      <CheckCircle size={64} className="mx-auto text-emerald-500 mb-6" />
      <h2 className="text-3xl font-semibold text-navy-900 mb-3">
        Quote Request Received!
      </h2>
      <p className="text-navy-500 mb-8">
        Thank you for choosing Tori&apos;s Cleaning Service. We&apos;ve received
        your request and will review it shortly.
      </p>

      <div className="bg-white border-2 border-navy-100 p-6 mb-8">
        <p className="text-sm text-navy-500 mb-2">Your Request ID</p>
        <p className="text-2xl font-mono font-bold text-navy-600 tracking-wider">
          #{requestId}
        </p>
      </div>

      <p className="text-sm text-navy-500 mb-8">
        A confirmation has been sent to your email. Our team will contact you
        within 24 hours with a personalized quote. No payment is needed at this
        stage.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
        <Link href="/services/residential-cleaning">
          <Button variant="outline" size="lg">
            Explore Services
          </Button>
        </Link>
      </div>
    </div>
  );
}
