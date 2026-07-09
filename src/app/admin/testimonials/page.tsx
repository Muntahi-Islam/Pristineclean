"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar: string | null;
  content: string;
  rating: number;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", avatar: "", content: "", rating: 5, featured: false });

  async function load() {
    const { getTestimonials } = await import("@/actions/admin-crud");
    const data = await getTestimonials();
    setItems(data as unknown as Testimonial[]);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ name: "", role: "", company: "", avatar: "", content: "", rating: 5, featured: false });
    setShowForm(true);
  }

  function openEdit(item: Testimonial) {
    setEditing(item);
    setForm({ name: item.name, role: item.role ?? "", company: item.company ?? "", avatar: item.avatar ?? "", content: item.content, rating: item.rating, featured: item.featured });
    setShowForm(true);
  }

  async function handleSave() {
    const { createTestimonial, updateTestimonial } = await import("@/actions/admin-crud");
    if (editing) {
      await updateTestimonial(editing.id, form);
    } else {
      await createTestimonial(form);
    }
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const { deleteTestimonial } = await import("@/actions/admin-crud");
    await deleteTestimonial(id);
    load();
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-900">Testimonials</h1>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-2" /> Add Testimonial
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border-2 border-navy-100 p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="font-semibold text-navy-900">{editing ? "Edit" : "Add"} Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Name *</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Role</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Company</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Avatar URL</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Content *</label>
              <textarea className="w-full border-2 border-navy-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none resize-y" rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Rating (1-5)</label>
              <select className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="t-featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
              <label htmlFor="t-featured" className="text-sm text-navy-700">Featured</label>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-white border-2 border-navy-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-navy-100 bg-navy-50/50">
              <th className="text-left p-4 text-navy-500 font-medium">Customer</th>
              <th className="text-left p-4 text-navy-500 font-medium">Content</th>
              <th className="text-left p-4 text-navy-500 font-medium">Rating</th>
              <th className="text-left p-4 text-navy-500 font-medium">Status</th>
              <th className="text-left p-4 text-navy-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-navy-500">No testimonials yet.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-navy-100 hover:bg-navy-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy-200 overflow-hidden flex-shrink-0">
                        {item.avatar ? <img src={item.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-navy-400 text-xs font-bold">{item.name.charAt(0)}</div>}
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">{item.name}</p>
                        <p className="text-xs text-navy-500">{item.role}{item.company ? ` at ${item.company}` : ""}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-navy-700 max-w-xs truncate">{item.content}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 ${item.published ? "bg-emerald-100 text-emerald-700" : "bg-navy-100 text-navy-500"}`}>{item.published ? "Published" : "Draft"}</span>
                      {item.featured && <span className="text-xs text-amber-600 font-medium">Featured</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-navy-400 hover:text-blue-600 transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-navy-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
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
