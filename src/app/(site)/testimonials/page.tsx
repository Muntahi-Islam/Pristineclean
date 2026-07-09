import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Hear from our satisfied customers.",
};

export default function Testimonials() {
  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg text-navy-500">
            Real feedback from real customers who trust us with their spaces.
          </p>
        </div>
        <TestimonialsPage />
      </div>
    </div>
  );
}
