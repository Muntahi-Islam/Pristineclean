import { z } from "zod";

export const quoteSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  propertyType: z.enum(["RESIDENTIAL", "COMMERCIAL"]),
  bedrooms: z.coerce.number().min(0).optional(),
  bathrooms: z.coerce.number().min(0).optional(),
  squareFootage: z.coerce.number().min(0).optional(),
  frequency: z.string().min(1, "Please select a frequency"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  extras: z.array(z.string()),
  images: z.array(z.string()),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
