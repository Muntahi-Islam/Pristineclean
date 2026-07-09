"use server";

import { prisma } from "@/lib/prisma";

const DEFAULTS = {
  companyName: "PristineClean",
  companyTagline: "Premium Cleaning Services",
  supportEmail: "hello@pristineclean.com",
  phone: "(555) 123-4567",
  address: "123 Luxury Lane, Suite 100, Beverly Hills, CA 90210",
  hours: "Mon - Sat: 7:00 AM - 8:00 PM",
  facebook: "https://facebook.com/pristineclean",
  instagram: "https://instagram.com/pristineclean",
  twitter: "https://twitter.com/pristineclean",
  linkedin: "https://linkedin.com/company/pristineclean",
};

export type SiteSettings = typeof DEFAULTS;

export async function getPublicSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany();
    const db: Record<string, string> = {};
    for (const r of rows) db[r.key] = r.value;
    return { ...DEFAULTS, ...db };
  } catch {
    return { ...DEFAULTS };
  }
}
