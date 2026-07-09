"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
}

const FAQ_CATEGORIES = ["general", "pricing", "services", "scheduling", "commercial"];

export default function AdminFAQ() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "general", order: 0 });

  async function load() {
    const { getFAQs } = await import("@/actions/admin-crud");
    const data = await getFAQs();
    setItems(data as unknown as FAQItem[]);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ question: "", answer: "", category: "general", order: 0 });
    setShowForm(true);
  }

  function openEdit(item: FAQItem) {
    setEditing(item);
    setForm({ question: item.question, answer: item.answer, category: item.category, order: item.order });
    setShowForm(true);
  }

  async function handleSave() {
    const { createFAQ, updateFAQ } = await import("@/actions/admin-crud");
    if (editing) {
      await updateFAQ(editing.id, form);
    } else {
      await createFAQ(form);
    }
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    const { deleteFAQ } = await import("@/actions/admin-crud");
    await deleteFAQ(id);
    load();
  }

  const grouped = items.reduce<Record<string, FAQItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-900">FAQ</h1>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-2" /> Add Question
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border-2 border-navy-100 p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="font-semibold text-navy-900">{editing ? "Edit" : "Add"} FAQ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Question *</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-navy-600 focus:outline-none" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Answer *</label>
              <textarea className="w-full border-2 border-navy-200 px-3 py-2 text-sm focus:border-navy-600 focus:outline-none resize-y" rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Category</label>
              <select className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-navy-600 focus:outline-none" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {FAQ_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Order</label>
              <input type="number" className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-navy-600 focus:outline-none" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {Object.keys(grouped).length === 0 ? (
        <div className="bg-white border-2 border-navy-100 p-12 text-center text-navy-500">No FAQs yet.</div>
      ) : (
        Object.entries(grouped).map(([category, faqs]) => (
          <div key={category} className="bg-white border-2 border-navy-100">
            <div className="px-6 py-3 border-b-2 border-navy-100 bg-navy-50/50">
              <h3 className="text-sm font-semibold text-navy-500 uppercase tracking-wider">{category}</h3>
            </div>
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-navy-100 last:border-b-0">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-navy-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ChevronDown size={14} className={`text-navy-400 transition-transform ${expandedId === faq.id ? "rotate-180" : ""}`} />
                    <span className="font-medium text-navy-900">{faq.question}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!faq.published && <span className="text-xs text-navy-400">Draft</span>}
                    <button onClick={(e) => { e.stopPropagation(); openEdit(faq); }} className="p-1 text-navy-400 hover:text-navy-600 transition-colors"><Pencil size={13} /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(faq.id); }} className="p-1 text-navy-400 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                  </div>
                </button>
                {expandedId === faq.id && (
                  <div className="px-4 pb-4 pl-12 text-sm text-navy-600 leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
