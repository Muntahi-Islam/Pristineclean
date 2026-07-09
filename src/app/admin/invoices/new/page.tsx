"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewStandaloneInvoice() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    service: "",
    amount: "",
    tax: "",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerName || !form.customerEmail || !form.service || !form.amount) return;

    setLoading(true);
    try {
      const { createStandaloneInvoice } = await import("@/actions/invoice");
      const result = await createStandaloneInvoice({
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone || undefined,
        customerAddress: form.customerAddress || undefined,
        service: form.service,
        amount: Number(form.amount),
        tax: form.tax ? Number(form.tax) : undefined,
        notes: form.notes || undefined,
      });

      if (result.success && result.invoice) {
        router.push(`/admin/invoices/${(result.invoice as any).id}`);
      } else {
        alert(result.error || "Failed to create invoice");
      }
    } catch {
      alert("Failed to create invoice");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/invoices" className="flex items-center gap-2 text-sm text-navy-500 hover:text-navy-600 transition-colors mb-2">
            <ArrowLeft size={16} />
            Back to Invoices
          </Link>
          <h1 className="text-2xl font-semibold text-navy-900">New Invoice</h1>
          <p className="text-sm text-navy-500 mt-1">
            Create an invoice without a quote.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border-2 border-navy-100 p-8 max-w-2xl space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1 block">Name *</label>
              <Input
                required
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
                placeholder="Customer name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1 block">Email *</label>
              <Input
                required
                type="email"
                value={form.customerEmail}
                onChange={(e) => update("customerEmail", e.target.value)}
                placeholder="customer@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1 block">Phone</label>
              <Input
                value={form.customerPhone}
                onChange={(e) => update("customerPhone", e.target.value)}
                placeholder="(713) 555-0123"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1 block">Address</label>
              <Input
                value={form.customerAddress}
                onChange={(e) => update("customerAddress", e.target.value)}
                placeholder="123 Main St, Houston, TX 77001"
              />
            </div>
          </div>
        </div>

        <div className="border-t-2 border-navy-100 pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-4">Service Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-navy-700 mb-1 block">Service Description *</label>
              <Input
                required
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                placeholder="e.g. Deep Cleaning - 3BR/2BA House"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-navy-700 mb-1 block">Amount ($) *</label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.amount}
                  onChange={(e) => update("amount", e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-700 mb-1 block">Tax ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.tax}
                  onChange={(e) => update("tax", e.target.value)}
                  placeholder="Auto-calculated (8%)"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-navy-100 pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-navy-400 mb-4">Notes</h3>
          <Textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Additional notes (optional)"
            rows={3}
          />
        </div>

        <div className="border-t-2 border-navy-100 pt-6 flex justify-end gap-3">
          <Link href="/admin/invoices">
            <Button type="button" variant="ghost" size="sm">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" size="sm" disabled={loading}>
            {loading ? (
              <RefreshCw size={16} className="mr-2 animate-spin" />
            ) : (
              <Plus size={16} className="mr-2" />
            )}
            Create Invoice
          </Button>
        </div>
      </form>
    </div>
  );
}
