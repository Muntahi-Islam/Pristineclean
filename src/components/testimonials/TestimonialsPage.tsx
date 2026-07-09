"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    content:
      "Exceptional attention to detail. Every corner of our home was spotless. The team was professional, punctual, and thorough. I've never been more impressed with a cleaning service.",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    name: "James Chen",
    role: "Property Manager",
    content:
      "We manage multiple properties and Tori's Cleaning Service handles all our cleaning needs. Consistent quality, reliable scheduling, and outstanding results every time.",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Emily Rodriguez",
    role: "Business Owner",
    content:
      "Our office has never looked better. The team works around our schedule, uses eco-friendly products, and the results are truly outstanding. Highly recommended.",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    name: "Michael Torres",
    role: "Homeowner",
    content:
      "The deep cleaning service transformed our home. They reached places we didn't even know needed cleaning. Worth every penny.",
    rating: 5,
    date: "2 months ago",
  },
  {
    name: "Lisa Park",
    role: "Real Estate Agent",
    content:
      "I recommend Tori's Cleaning Service to all my clients. Their move-in/move-out cleaning is exceptional and helps my clients feel confident in their transactions.",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "David Thompson",
    role: "Office Manager",
    content:
      "Reliable, professional, and thorough. Our team loves coming into a freshly cleaned office. The regular service has been flawless for over a year.",
    rating: 5,
    date: "2 weeks ago",
  },
];

export function TestimonialsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="bg-white border-2 border-navy-100 p-8 transition-all hover:border-navy-600 hover:shadow-lg"
        >
          <div className="flex gap-1 mb-4">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-navy-600 text-navy-600"
              />
            ))}
          </div>
          <p className="text-navy-700 leading-relaxed mb-6">
            &ldquo;{t.content}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-navy-600">
                {t.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-navy-900">{t.name}</p>
              <p className="text-xs text-navy-500">{t.role}</p>
            </div>
          </div>
          <p className="text-xs text-navy-400 mt-4">{t.date}</p>
        </div>
      ))}
    </div>
  );
}
