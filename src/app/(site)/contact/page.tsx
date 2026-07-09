"use client";

import { useState } from "react";
import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ContactPage() {
  const settings = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.currentTarget);
    const result = await submitContact({
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      subject: form.get("subject") as string,
      message: form.get("message") as string,
    });
    setIsLoading(false);
    if (result.success) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="section-padding bg-warm-50">
        <div className="container-main text-center py-16 max-w-lg mx-auto">
          <CheckCircle size={64} className="mx-auto text-emerald-500 mb-6" />
          <h1 className="text-3xl font-semibold text-navy-900 mb-4">Message Sent!</h1>
          <p className="text-navy-500">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
        </div>
      </div>
    );
  }

  const s = settings ?? { phone: "+1 713-259-3741", supportEmail: "toriscleaningservice@gmail.com", address: "15120 Lee Rd, Humble, TX 77395", hours: "Mon - Sat: 7:00 AM - 8:00 PM" } as any;

  return (
    <div className="section-padding bg-warm-50">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-navy-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-navy-500">Have a question? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">Name *</label>
                  <input name="name" required className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">Email *</label>
                  <input name="email" type="email" required className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">Phone</label>
                  <input name="phone" className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">Subject *</label>
                  <input name="subject" required className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-navy-600 focus:outline-none" placeholder="How can we help?" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-navy-900/80 mb-1.5 block">Message *</label>
                <textarea name="message" required rows={6} className="flex w-full border-2 border-navy-200 bg-white px-4 py-3 text-navy-900 focus:border-navy-600 focus:outline-none resize-y" placeholder="Tell us more about your inquiry..." />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-6">Contact Information</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <Phone size={20} className="text-navy-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-900">Phone</p>
                    <a href={`tel:${s.phone}`} className="text-navy-500 hover:text-navy-600 transition-colors">{s.phone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={20} className="text-navy-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-900">Email</p>
                    <a href={`mailto:${s.supportEmail}`} className="text-navy-500 hover:text-navy-600 transition-colors">{s.supportEmail}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-navy-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-900">Address</p>
                    <p className="text-navy-500">{s.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock size={20} className="text-navy-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-navy-900">Hours</p>
                    <p className="text-navy-500">{s.hours}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="aspect-[16/9] bg-navy-100 border-2 border-navy-200 flex items-center justify-center">
              <p className="text-sm text-navy-500">Google Maps integration ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
