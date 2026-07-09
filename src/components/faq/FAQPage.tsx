"use client";

import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "How do I get a quote?",
        a: "Simply fill out our online quote request form with details about your space and needs. We'll review your request and provide a personalized quote within 24 hours.",
      },
      {
        q: "Are you insured and bonded?",
        a: "Yes, absolutely. Tori's Cleaning Service is fully insured and bonded for your peace of mind. All our team members undergo background checks and thorough training.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve the greater Houston area including Humble, Katy, Sugar Land, Pearland, Spring, The Woodlands, Pasadena, and surrounding neighborhoods.",
      },
      {
        q: "Do you use eco-friendly products?",
        a: "Yes, we prioritize eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment. We also offer organic cleaning options.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        q: "What services do you offer?",
        a: "We offer residential cleaning, commercial cleaning, deep cleaning, move-in/move-out cleaning, carpet cleaning, window cleaning, and office cleaning services.",
      },
      {
        q: "Can I customize my cleaning service?",
        a: "Absolutely. We tailor every cleaning plan to your specific needs. You can add extra services like inside oven cleaning, refrigerator cleaning, laundry, and more.",
      },
      {
        q: "Do I need to be home during cleaning?",
        a: "Not necessarily. Many of our clients provide access instructions and trust us to clean while they're away. We always ensure secure, professional service.",
      },
    ],
  },
  {
    category: "Booking & Payment",
    items: [
      {
        q: "How do I book a service?",
        a: "You can request a quote through our online form. Once approved, we'll schedule a convenient time for your cleaning. No payment is needed at the quote stage.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, debit cards, and bank transfers. Payment is processed after the service is completed to your satisfaction.",
      },
      {
        q: "Can I reschedule or cancel?",
        a: "Yes, you can reschedule or cancel up to 24 hours before your scheduled appointment at no charge. Late cancellations may incur a fee.",
      },
    ],
  },
  {
    category: "Satisfaction",
    items: [
      {
        q: "What if I'm not satisfied with the cleaning?",
        a: "Your satisfaction is guaranteed. If something isn't up to your standards, contact us within 24 hours and we'll make it right at no additional cost.",
      },
      {
        q: "How do you ensure quality?",
        a: "We use detailed cleaning checklists, conduct quality inspections, and follow up with every client to ensure complete satisfaction.",
      },
    ],
  },
];

export function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("General");

  const categories = faqs.map((f) => f.category);

  const filteredFaqs = faqs
    .filter((f) => activeCategory === "General" || f.category === activeCategory)
    .map((f) => ({
      ...f,
      items: f.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((f) => f.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-12 border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-navy-900 text-white"
                : "bg-white text-navy-700 border-2 border-navy-200 hover:border-navy-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredFaqs.map((faq) => (
          <div key={faq.category} className="mb-8">
            <Accordion type="multiple">
              {faq.items.map((item, i) => (
                <AccordionItem key={i} value={`${faq.category}-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
