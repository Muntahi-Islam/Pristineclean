"use server";

import { prisma } from "@/lib/prisma";

function serializeInvoice(inv: any) {
  return {
    ...inv,
    amount: Number(inv.amount),
    tax: Number(inv.tax),
    total: Number(inv.total),
    quote: inv.quote ? {
      ...inv.quote,
      estimatedValue: inv.quote.estimatedValue ? inv.quote.estimatedValue.toString() : null,
    } : null,
  };
}

export async function generateInvoice(quoteId: string) {
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
  });

  if (!quote) return { success: false, error: "Quote not found" };

  if (quote.status !== "COMPLETED") return { success: false, error: "Quote must be marked COMPLETED before generating an invoice" };

  const existing = await prisma.invoice.findFirst({
    where: { quoteId },
  });
  if (existing) return { success: false, error: "Invoice already exists" };

  const count = await prisma.invoice.count();
  const invoiceNumber = `INV-${String(count + 1).padStart(4, "0")}`;

  const amount = quote.estimatedValue
    ? Number(quote.estimatedValue)
    : Math.floor(Math.random() * 500) + 100;

  const tax = Number((amount * 0.08).toFixed(2));
  const total = Number((amount + tax).toFixed(2));

  const address = [quote.street, quote.city, quote.state, quote.zipCode]
    .filter(Boolean)
    .join(", ");

  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        quoteId: quote.id,
        customerName: quote.customerName,
        customerEmail: quote.customerEmail,
        customerPhone: quote.customerPhone,
        customerAddress: address,
        service: quote.service,
        amount,
        tax,
        total,
        status: "PAID",
      },
    });

    return { success: true, invoice: serializeInvoice(invoice) };
  } catch (error) {
    console.error("Invoice creation error:", error);
    return { success: false, error: "Failed to create invoice" };
  }
}

export async function createStandaloneInvoice(data: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  service: string;
  amount: number;
  tax?: number;
  notes?: string;
}) {
  const count = await prisma.invoice.count();
  const invoiceNumber = `INV-${String(count + 1).padStart(4, "0")}`;

  const amount = Number(data.amount);
  const tax = data.tax !== undefined ? Number(data.tax) : Number((amount * 0.08).toFixed(2));
  const total = Number((amount + tax).toFixed(2));

  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone || null,
        customerAddress: data.customerAddress || null,
        service: data.service,
        amount,
        tax,
        total,
        status: "PAID",
        notes: data.notes || null,
        quoteId: null,
      },
    });

    return { success: true, invoice: serializeInvoice(invoice) };
  } catch (error) {
    console.error("Invoice creation error:", error);
    return { success: false, error: "Failed to create invoice" };
  }
}

export async function getInvoices() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: { quote: true },
    });
    return invoices.map(serializeInvoice);
  } catch {
    return [];
  }
}

export async function getInvoiceById(id: string) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { quote: true },
    });
    return invoice ? serializeInvoice(invoice) : null;
  } catch {
    return null;
  }
}
