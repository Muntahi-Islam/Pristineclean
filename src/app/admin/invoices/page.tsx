"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileSpreadsheet, Plus, Download } from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  service: string;
  amount: number;
  tax: number;
  total: number;
  status: string;
  createdAt: string;
  quote: { requestId: string } | null;
}

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInvoices = useCallback(async () => {
    try {
      const { getInvoices } = await import("@/actions/invoice");
      const data = await getInvoices();
      setInvoices(data as unknown as Invoice[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Invoices</h1>
          <p className="text-sm text-navy-500 mt-1">
            Manage and generate invoices for completed services.
          </p>
        </div>
        <Link href="/admin/quotes">
          <Button variant="primary" size="sm">
            <Plus size={16} className="mr-2" />
            New from Quote
          </Button>
        </Link>
      </div>

      <div className="bg-white border-2 border-navy-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-navy-100 bg-navy-50/50">
              <th className="text-left p-4 text-navy-500 font-medium">
                Invoice #
              </th>
              <th className="text-left p-4 text-navy-500 font-medium">
                Customer
              </th>
              <th className="text-left p-4 text-navy-500 font-medium">
                Service
              </th>
              <th className="text-left p-4 text-navy-500 font-medium">Total</th>
              <th className="text-left p-4 text-navy-500 font-medium">Date</th>
              <th className="text-left p-4 text-navy-500 font-medium">
                Status
              </th>
              <th className="text-left p-4 text-navy-500 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-navy-500">
                  Loading...
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-navy-500">
                  <FileSpreadsheet
                    size={32}
                    className="mx-auto mb-2 text-navy-300"
                  />
                  No invoices yet. Generate one from a quote.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-navy-100 hover:bg-navy-50/50"
                >
                  <td className="p-4 font-mono text-xs font-medium text-navy-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-navy-900">
                      {inv.customerName}
                    </p>
                    <p className="text-xs text-navy-500">
                      {inv.customerEmail}
                    </p>
                  </td>
                  <td className="p-4 text-navy-700">{inv.service}</td>
                  <td className="p-4 font-medium text-navy-900">
                    {formatCurrency(Number(inv.total))}
                  </td>
                  <td className="p-4 text-navy-500">
                    {formatDate(inv.createdAt)}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        inv.status === "PAID" ? "success" : "warning"
                      }
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/admin/invoices/${inv.id}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                      <Download size={14} />
                      View PDF
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
