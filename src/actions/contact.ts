"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { contactSchema, type ContactInput } from "@/schemas/contact";
import { COMPANY } from "@/lib/constants";

export async function submitContact(data: ContactInput) {
  const validated = contactSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, error: "Invalid form data" };
  }

  try {
    const contact = await prisma.contact.create({
      data: validated.data,
    });

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `Tori's Cleaning Service <noreply@${process.env.RESEND_DOMAIN ?? "toriscleaningservice.com"}>`,
        to: COMPANY.email,
        subject: `New Contact: ${validated.data.subject}`,
        text: `
Name: ${validated.data.name}
Email: ${validated.data.email}
Phone: ${validated.data.phone ?? "N/A"}
Subject: ${validated.data.subject}
Message: ${validated.data.message}
        `,
      });
    }

    return { success: true, id: contact.id };
  } catch (error) {
    console.error("Contact submission error:", error);
    return { success: false, error: "Failed to send message" };
  }
}
