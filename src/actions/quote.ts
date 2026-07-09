"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { quoteSchema, type QuoteInput } from "@/schemas/quote";
import { QuoteConfirmationEmail } from "@/emails/quote-confirmation";
import { QuoteNotificationEmail } from "@/emails/quote-notification";
import { COMPANY } from "@/lib/constants";

export async function submitQuote(data: QuoteInput) {
  const validated = quoteSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, error: "Invalid form data" };
  }

  const {
    service,
    propertyType,
    bedrooms,
    bathrooms,
    squareFootage,
    frequency,
    preferredDate,
    preferredTime,
    street,
    city,
    state,
    zipCode,
    extras,
    images,
    customerName,
    customerEmail,
    customerPhone,
    company,
    notes,
  } = validated.data;

  try {
    const quote = await prisma.quote.create({
      data: {
        service,
        propertyType,
        bedrooms: bedrooms ?? null,
        bathrooms: bathrooms ?? null,
        squareFootage: squareFootage ?? null,
        frequency,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime,
        street,
        city,
        state,
        zipCode,
        extras,
        images,
        customerName,
        customerEmail,
        customerPhone,
        company: company ?? null,
        notes: notes ?? null,
        status: "PENDING",
      },
    });

    const formattedDate = preferredDate
      ? new Date(preferredDate).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Not specified";

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        resend.emails.send({
          from: `Tori's Cleaning Service <noreply@${process.env.RESEND_DOMAIN ?? "toriscleaningservice.com"}>`,
          to: customerEmail,
          subject: "Quote Request Received - Tori's Cleaning Service",
          react: QuoteConfirmationEmail({
            requestId: quote.requestId,
            customerName,
            service,
            preferredDate: formattedDate,
            preferredTime: preferredTime ?? "Not specified",
          }),
        }),
        resend.emails.send({
          from: `Tori's Cleaning Service <noreply@${process.env.RESEND_DOMAIN ?? "toriscleaningservice.com"}>`,
          to: COMPANY.email,
          subject: `New Quote Request - ${customerName}`,
          react: QuoteNotificationEmail({
            requestId: quote.requestId,
            customerName,
            customerEmail,
            customerPhone,
            service,
            propertyType,
            frequency,
            preferredDate: formattedDate,
          }),
        }),
      ]);
    }

    return {
      success: true,
      requestId: quote.requestId,
    };
  } catch (error) {
    console.error("Quote submission error:", error);
    return { success: false, error: "Failed to submit quote request" };
  }
}

export async function getQuoteByRequestId(requestId: string) {
  try {
    const quote = await prisma.quote.findUnique({
      where: { requestId },
    });
    return quote;
  } catch {
    return null;
  }
}
