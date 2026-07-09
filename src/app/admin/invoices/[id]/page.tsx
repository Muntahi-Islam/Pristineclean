"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { COMPANY } from "@/lib/constants";

interface InvoiceData {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  customerAddress: string | null;
  service: string;
  amount: number;
  tax: number;
  total: number;
  status: string;
  notes: string | null;
  createdAt: string;
  quote: { requestId: string } | null;
}

export default function InvoiceDetail() {
  const params = useParams();
  const settings = useSiteSettings();
  const printRef = useRef<HTMLDivElement>(null);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { getInvoiceById } = await import("@/actions/invoice");
        const data = await getInvoiceById(params.id as string);
        setInvoice(data as unknown as InvoiceData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const styles = Array.from(document.querySelectorAll("link[rel=stylesheet], style"))
      .map((el) => el.outerHTML)
      .join("\n");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice?.invoiceNumber ?? ""}</title>
          ${styles}
          <style>
            body {
              background: white !important;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            @page { margin: 0; size: letter; }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    }, 500);
  };

  if (loading) return <div className="text-center py-12 text-navy-500">Loading...</div>;
  if (!invoice) return <div className="text-center py-12 text-navy-500">Invoice not found.</div>;

  const s = settings ?? { address: "", phone: "", supportEmail: "" } as any;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 no-print">
        <Link href="/admin/invoices" className="flex items-center gap-2 text-sm text-navy-500 hover:text-navy-600 transition-colors">
          <ArrowLeft size={16} />
          Back to Invoices
        </Link>
        <Button variant="primary" size="sm" onClick={handlePrint}>
          <Printer size={16} className="mr-2" />
          Print / Save PDF
        </Button>
      </div>

      <div ref={printRef} className="bg-white border-2 border-navy-100 p-10 max-w-3xl mx-auto" id="invoice-print">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              <span className="font-serif">{COMPANY.name.split(" ")[0]}</span>
              <span className="text-navy-600"> {COMPANY.name.split(" ").slice(1).join(" ")}</span>
            </h1>
            {s.address && <p className="text-sm text-navy-500 mt-1">{s.address}</p>}
            {s.phone && <p className="text-sm text-navy-500">{s.phone}</p>}
            {s.supportEmail && <p className="text-sm text-navy-500">{s.supportEmail}</p>}
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-navy-900">INVOICE</h2>
            <p className="text-lg font-mono text-navy-600 mt-2">{invoice.invoiceNumber}</p>
            <p className="text-sm text-navy-500 mt-1">Date: {formatDate(invoice.createdAt)}</p>
          </div>
        </div>

        <div className="mb-10 pb-10 border-b-2 border-navy-100">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-2">Bill To</h3>
          <p className="font-semibold text-navy-900">{invoice.customerName}</p>
          {invoice.customerAddress && <p className="text-sm text-navy-500">{invoice.customerAddress}</p>}
          <p className="text-sm text-navy-500">{invoice.customerEmail}</p>
          {invoice.customerPhone && <p className="text-sm text-navy-500">{invoice.customerPhone}</p>}
        </div>

        <table className="w-full mb-10">
          <thead>
            <tr className="border-b-2 border-navy-900">
              <th className="text-left py-3 text-xs font-semibold uppercase tracking-widest text-navy-500">Description</th>
              <th className="text-right py-3 text-xs font-semibold uppercase tracking-widest text-navy-500">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-navy-100">
              <td className="py-4 text-navy-900">{invoice.service}</td>
              <td className="py-4 text-right text-navy-900">{formatCurrency(Number(invoice.amount))}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mb-10">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm text-navy-500">
              <span>Subtotal</span>
              <span>{formatCurrency(Number(invoice.amount))}</span>
            </div>
            <div className="flex justify-between text-sm text-navy-500">
              <span>Tax (8%)</span>
              <span>{formatCurrency(Number(invoice.tax))}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-navy-900 pt-2 border-t-2 border-navy-900">
              <span>Total</span>
              <span>{formatCurrency(Number(invoice.total))}</span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-navy-400 pt-10 border-t-2 border-navy-100">
           <p>Thank you for choosing {COMPANY.name}!</p>
          <p className="mt-1">Payment is due within 30 days. Please include invoice number with payment.</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `@media print {
  .no-print { display: none !important; }
  body {
    background: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin: 0;
    padding: 0;
  }
  #invoice-print {
    border: none !important;
    box-shadow: none !important;
    max-width: 100% !important;
    padding: 0.75in !important;
  }
  @page {
    margin: 0;
    size: letter;
  }
}`
      }} />
    </div>
  );
}
