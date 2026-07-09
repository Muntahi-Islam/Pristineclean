"use server";

import { prisma } from "@/lib/prisma";

const DEFAULTS = {
  companyName: "Tori's Cleaning Service",
  companyTagline: "Professional Cleaning Services",
  supportEmail: "toriscleaningservice@gmail.com",
  phone: "+1 713-259-3741",
  address: "15120 Lee Rd, Humble, TX 77395",
  hours: "Mon - Sat: 7:00 AM - 8:00 PM",
  facebook: "https://facebook.com/toriscleaning",
  instagram: "https://instagram.com/toriscleaning",
  twitter: "",
  linkedin: "",
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
