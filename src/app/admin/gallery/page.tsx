"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image: string;
  category: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
}

const CATEGORIES = ["general", "residential", "commercial", "deep-clean", "move-in", "move-out", "office", "carpet", "window"];

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "", category: "general", featured: false });

  async function load() {
    const { getGalleryItems } = await import("@/actions/admin-crud");
    const data = await getGalleryItems();
    setItems(data as unknown as GalleryItem[]);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ title: "", description: "", image: "", category: "general", featured: false });
    setShowForm(true);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setForm({ title: item.title ?? "", description: item.description ?? "", image: item.image, category: item.category, featured: item.featured });
    setShowForm(true);
  }

  async function handleSave() {
    const { createGalleryItem, updateGalleryItem } = await import("@/actions/admin-crud");
    if (editing) {
      await updateGalleryItem(editing.id, form);
    } else {
      await createGalleryItem(form);
    }
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this gallery item?")) return;
    const { deleteGalleryItem } = await import("@/actions/admin-crud");
    await deleteGalleryItem(id);
    load();
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-900">Gallery</h1>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-2" /> Add Image
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border-2 border-navy-100 p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="font-semibold text-navy-900">{editing ? "Edit" : "Add"} Gallery Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Title</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Category</label>
              <select className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Image URL</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Description</label>
              <textarea className="w-full border-2 border-navy-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none resize-y" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="g-featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
              <label htmlFor="g-featured" className="text-sm text-navy-700">Featured</label>
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
              <th className="text-left p-4 text-navy-500 font-medium">Image</th>
              <th className="text-left p-4 text-navy-500 font-medium">Title</th>
              <th className="text-left p-4 text-navy-500 font-medium">Category</th>
              <th className="text-left p-4 text-navy-500 font-medium">Status</th>
              <th className="text-left p-4 text-navy-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-navy-500">No gallery items yet.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-navy-100 hover:bg-navy-50 transition-colors">
                  <td className="p-4">
                    <div className="w-16 h-12 bg-navy-100 overflow-hidden">
                      {item.image ? <img src={item.image} alt={item.title ?? ""} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-navy-300 text-xs">No img</div>}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-navy-900">{item.title || "Untitled"}</p>
                    <p className="text-xs text-navy-500">{formatDate(item.createdAt)}</p>
                  </td>
                  <td className="p-4 text-navy-700 text-xs">{item.category}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 ${item.published ? "bg-emerald-100 text-emerald-700" : "bg-navy-100 text-navy-500"}`}>{item.published ? "Published" : "Draft"}</span>
                      {item.featured && <Star size={12} className="text-amber-500 fill-amber-500" />}
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
