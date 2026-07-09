"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Search, ExternalLink, FileSpreadsheet, CheckCircle2, Clock, Eye,
  XCircle, ThumbsDown, DollarSign, RefreshCw, MessageSquare,
} from "lucide-react";

interface Quote {
  id: string;
  requestId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  propertyType: string;
  frequency: string;
  estimatedValue: string | null;
  status: string;
  createdAt: string;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  notes: string | null;
  internalNotes: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  extras: string[];
}

const STATUS_FLOW: Record<string, { next: string | null; label: string; icon: any; color: string; bg: string; text: string }> = {
  PENDING:    { next: "REVIEWED",  label: "Pending",     icon: Clock,        color: "border-l-amber-400 bg-amber-50",  text: "text-amber-700", bg: "bg-amber-100" },
  REVIEWED:  { next: "CONTACTED", label: "Reviewed",    icon: Eye,          color: "border-l-blue-400 bg-blue-50",    text: "text-blue-700",   bg: "bg-blue-100" },
  CONTACTED: { next: "COMPLETED", label: "Contacted",   icon: MessageSquare,color: "border-l-indigo-400 bg-indigo-50",text: "text-indigo-700", bg: "bg-indigo-100" },
  COMPLETED: { next: "CLOSED",    label: "Completed",   icon: CheckCircle2, color: "border-l-emerald-400 bg-emerald-50", text: "text-emerald-700", bg: "bg-emerald-100" },
  DECLINED:  { next: null,        label: "Declined",    icon: ThumbsDown,   color: "border-l-red-400 bg-red-50",      text: "text-red-700",    bg: "bg-red-100" },
  CLOSED:    { next: null,        label: "Closed",      icon: XCircle,      color: "border-l-gray-400 bg-gray-50",    text: "text-gray-600",   bg: "bg-gray-100" },
};

export default function AdminQuotes() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState("");

  const loadQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const { getQuotes } = await import("@/actions/admin");
      const result = await getQuotes({ status: filter, search, limit: 100 });
      setQuotes(result.quotes as unknown as Quote[]);
    } catch (e) {
      console.error("Failed to load quotes:", e);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => { loadQuotes(); }, [loadQuotes]);

  useEffect(() => {
    if (selectedQuote) {
      setPriceInput(selectedQuote.estimatedValue ?? "");
    }
  }, [selectedQuote]);

  async function handleStatusChange(id: string, status: string) {
    setActionLoading(id);
    try {
      const { updateQuoteStatus } = await import("@/actions/admin");
      const fd = new FormData();
      fd.set("id", id);
      fd.set("status", status);
      await updateQuoteStatus(fd);
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
      if (selectedQuote?.id === id) setSelectedQuote({ ...selectedQuote, status });
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleSavePrice() {
    if (!selectedQuote) return;
    setActionLoading(selectedQuote.id);
    try {
      const { updateQuotePrice } = await import("@/actions/admin");
      const fd = new FormData();
      fd.set("id", selectedQuote.id);
      fd.set("estimatedValue", priceInput);
      await updateQuotePrice(fd);
      setQuotes((prev) => prev.map((q) => (q.id === selectedQuote.id ? { ...q, estimatedValue: priceInput } : q)));
      setSelectedQuote({ ...selectedQuote, estimatedValue: priceInput });
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleGenerateInvoice(quoteId: string) {
    try {
      const { generateInvoice } = await import("@/actions/invoice");
      const result = await generateInvoice(quoteId);
      if (result.success) {
        router.push("/admin/invoices");
      } else {
        alert(result.error || "Failed to generate invoice");
      }
    } catch {
      alert("Failed to generate invoice");
    }
  }

  const STATUS_FILTERS = ["ALL", "PENDING", "REVIEWED", "CONTACTED", "COMPLETED", "DECLINED", "CLOSED"];

  function getNextStatuses(current: string): Array<{ status: string; label: string; variant: "primary" | "outline" | "ghost" }> {
    const flow: Record<string, Array<{ status: string; label: string; variant: "primary" | "outline" | "ghost" }>> = {
      PENDING:    [{ status: "REVIEWED", label: "Mark Reviewed", variant: "primary" }, { status: "DECLINED", label: "Decline", variant: "outline" }],
      REVIEWED:  [{ status: "CONTACTED", label: "Mark Contacted", variant: "primary" }],
      CONTACTED: [{ status: "COMPLETED", label: "Mark Completed", variant: "primary" }],
      COMPLETED: [{ status: "CLOSED", label: "Close Quote", variant: "ghost" }],
    };
    return flow[current] ?? [];
  }

  const selMeta = selectedQuote ? STATUS_FLOW[selectedQuote.status] : null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Quotes</h1>
          <p className="text-sm text-navy-500 mt-1">Review, price, and manage incoming quote requests.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((s) => {
            const meta = STATUS_FLOW[s];
            const Icon = meta?.icon;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all ${
                  filter === s
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-white text-navy-600 border-2 border-navy-200 hover:border-navy-400 hover:shadow-sm"
                }`}
              >
                {Icon && <Icon size={13} />}
                {s === "ALL" ? "All" : meta?.label ?? s}
              </button>
            );
          })}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border-2 border-navy-200 text-sm text-navy-900 focus:border-blue-600 focus:outline-none bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quotes List */}
        <div className="xl:col-span-2 bg-white border-2 border-navy-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-navy-100 bg-navy-50/50">
                  <th className="text-left p-4 text-navy-500 font-medium">Customer</th>
                  <th className="text-left p-4 text-navy-500 font-medium">Service</th>
                  <th className="text-left p-4 text-navy-500 font-medium">Date</th>
                  <th className="text-left p-4 text-navy-500 font-medium">Status</th>
                  <th className="text-right p-4 text-navy-500 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="p-12 text-center text-navy-400">Loading...</td></tr>
                ) : quotes.length === 0 ? (
                  <tr><td colSpan={5} className="p-12 text-center text-navy-400">
                    <MessageSquare size={32} className="mx-auto mb-2 text-navy-200" />
                    No quotes found.
                  </td></tr>
                ) : (
                  quotes.map((quote) => {
                    const meta = STATUS_FLOW[quote.status];
                    const Icon = meta?.icon;
                    return (
                      <tr
                        key={quote.id}
                        onClick={() => setSelectedQuote(quote)}
                        className={`border-b border-navy-100 hover:bg-navy-50 transition-all cursor-pointer ${
                          selectedQuote?.id === quote.id ? "bg-blue-50/50 ring-2 ring-inset ring-blue-200" : ""
                        }`}
                      >
                        <td className="p-4">
                          <p className="font-medium text-navy-900">{quote.customerName}</p>
                          <p className="text-xs text-navy-500">{quote.customerEmail}</p>
                        </td>
                        <td className="p-4 text-navy-700 max-w-[180px] truncate">{quote.service}</td>
                        <td className="p-4 text-navy-500 whitespace-nowrap text-xs">{formatDate(quote.createdAt)}</td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium ${meta?.bg} ${meta?.text}`}>
                            {Icon && <Icon size={11} />}
                            {meta?.label ?? quote.status}
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium text-navy-900">
                          {quote.estimatedValue ? formatCurrency(Number(quote.estimatedValue)) : "—"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="xl:col-span-1">
          {selectedQuote && selMeta ? (
            <div className="bg-white border-2 border-navy-100 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Status header */}
              <div className={`px-6 py-4 border-l-4 ${selMeta.color}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-navy-900">Quote Details</h3>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium ${selMeta.bg} ${selMeta.text}`}>
                    <selMeta.icon size={11} />
                    {selMeta.label}
                  </div>
                </div>
                <p className="text-xs text-navy-400 font-mono">#{selectedQuote.requestId.slice(0, 10)}</p>
              </div>

              <div className="p-6 space-y-5">
                {/* Customer */}
                <div className="bg-navy-50/50 p-4 -mx-6 px-6">
                  <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-widest mb-2">Customer</p>
                  <p className="font-medium text-navy-900 text-lg">{selectedQuote.customerName}</p>
                  <p className="text-sm text-navy-500">{selectedQuote.customerEmail}</p>
                  <p className="text-sm text-navy-500">{selectedQuote.customerPhone}</p>
                </div>

                {/* Service */}
                <div>
                  <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-widest mb-2">Service Details</p>
                  <p className="font-medium text-navy-900">{selectedQuote.service}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-xs bg-navy-100 text-navy-600 px-2 py-0.5">{selectedQuote.propertyType}</span>
                    <span className="text-xs bg-navy-100 text-navy-600 px-2 py-0.5">{selectedQuote.frequency.replace("_", " ")}</span>
                  </div>
                  {selectedQuote.bedrooms && (
                    <p className="text-sm text-navy-500 mt-2">{selectedQuote.bedrooms} bed, {selectedQuote.bathrooms} bath</p>
                  )}
                  {selectedQuote.extras?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedQuote.extras.map((e: string) => (
                        <span key={e} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5">{e}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Address */}
                {selectedQuote.street && (
                  <div>
                    <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-widest mb-2">Address</p>
                    <p className="text-sm text-navy-700 leading-relaxed">
                      {selectedQuote.street}<br />
                      {[selectedQuote.city, selectedQuote.state, selectedQuote.zipCode].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {selectedQuote.notes && (
                  <div>
                    <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-widest mb-2">Customer Notes</p>
                    <p className="text-sm text-navy-600 italic bg-navy-50/50 p-3">"{selectedQuote.notes}"</p>
                  </div>
                )}

                {/* Pricing */}
                <div className="border-t-2 border-navy-100 pt-4">
                  <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-widest mb-3">Pricing</p>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Set price..."
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        className="w-full h-10 pl-8 pr-3 border-2 border-navy-200 text-sm font-medium text-navy-900 focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={handleSavePrice}
                      disabled={actionLoading === selectedQuote.id}
                      className="h-10 px-3 bg-navy-900 text-white text-xs font-medium hover:bg-navy-800 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {actionLoading === selectedQuote.id ? <RefreshCw size={13} className="animate-spin" /> : <CheckCircle2 size={13} />}
                      Save
                    </button>
                  </div>
                  {selectedQuote.estimatedValue && (
                    <p className="text-lg font-bold text-emerald-600 mt-2">
                      {formatCurrency(Number(selectedQuote.estimatedValue))}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="border-t-2 border-navy-100 pt-4 space-y-2">
                  <p className="text-[11px] font-semibold text-navy-400 uppercase tracking-widest mb-3">Actions</p>

                  {getNextStatuses(selectedQuote.status).map((action) => {
                    const isDecline = action.status === "DECLINED";
                    return (
                      <Button
                        key={action.status}
                        variant={action.variant}
                        size="sm"
                        className={`w-full ${isDecline ? "border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700" : ""}`}
                        disabled={actionLoading === selectedQuote.id}
                        onClick={() => handleStatusChange(selectedQuote.id, action.status)}
                      >
                        {actionLoading === selectedQuote.id ? (
                          <RefreshCw size={14} className="mr-2 animate-spin" />
                        ) : isDecline ? (
                          <ThumbsDown size={14} className="mr-2" />
                        ) : (
                          <CheckCircle2 size={14} className="mr-2" />
                        )}
                        {action.label}
                      </Button>
                    );
                  })}

                  {/* Invoice button — only when COMPLETED */}
                  {selectedQuote.status === "COMPLETED" && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleGenerateInvoice(selectedQuote.id)}
                    >
                      <FileSpreadsheet size={14} className="mr-2" />
                      Generate Invoice
                    </Button>
                  )}

                  {/* Decline/restore */}
                  {selectedQuote.status === "DECLINED" && (
                    <button
                      onClick={() => handleStatusChange(selectedQuote.id, "PENDING")}
                      className="w-full text-xs text-navy-400 hover:text-blue-600 transition-colors py-2 flex items-center justify-center gap-1"
                    >
                      <RefreshCw size={13} /> Restore to Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-navy-100 p-12 text-center text-navy-400 h-full flex flex-col items-center justify-center">
              <ExternalLink size={36} className="mb-3 text-navy-200" />
              <p className="text-sm font-medium">Select a quote</p>
              <p className="text-xs text-navy-400 mt-1">to view details and take action</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
