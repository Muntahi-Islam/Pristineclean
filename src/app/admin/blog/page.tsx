"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: string;
  author: string;
  readingTime: number | null;
  published: boolean;
  featured: boolean;
  createdAt: string;
  seoTitle: string | null;
  seoDesc: string | null;
  canonical: string | null;
  ogImage: string | null;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    slug: "", title: "", excerpt: "", content: "", image: "", category: "general", author: "Admin",
    readingTime: "", published: false, featured: false,
    seoTitle: "", seoDesc: "", canonical: "", ogImage: "",
  });

  async function load() {
    const { getAllBlogPosts } = await import("@/actions/admin-crud");
    const data = await getAllBlogPosts({ limit: 100 });
    setPosts(data.posts as unknown as BlogPost[]);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ slug: "", title: "", excerpt: "", content: "", image: "", category: "general", author: "Admin", readingTime: "", published: false, featured: false, seoTitle: "", seoDesc: "", canonical: "", ogImage: "" });
    setShowForm(true);
  }

  function openEdit(post: BlogPost) {
    setEditing(post);
    setForm({
      slug: post.slug, title: post.title, excerpt: post.excerpt ?? "", content: post.content, image: post.image ?? "",
      category: post.category, author: post.author, readingTime: post.readingTime?.toString() ?? "",
      published: post.published, featured: post.featured,
      seoTitle: post.seoTitle ?? "", seoDesc: post.seoDesc ?? "", canonical: post.canonical ?? "", ogImage: post.ogImage ?? "",
    });
    setShowForm(true);
  }

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSave() {
    const { createBlogPost, updateBlogPost } = await import("@/actions/admin-crud");
    const data = {
      ...form,
      readingTime: form.readingTime ? Number(form.readingTime) : undefined,
      slug: form.slug || generateSlug(form.title),
    };
    if (editing) {
      await updateBlogPost(editing.id, data);
    } else {
      await createBlogPost(data as Parameters<typeof createBlogPost>[0]);
    }
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    const { deleteBlogPost } = await import("@/actions/admin-crud");
    await deleteBlogPost(id);
    load();
  }

  const categories = ["general", "cleaning-tips", "lifestyle", "commercial", "news"];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-900">Blog</h1>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-2" /> New Post
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border-2 border-navy-100 p-6 space-y-4 animate-in fade-in duration-200">
          <h3 className="font-semibold text-navy-900">{editing ? "Edit" : "Create"} Blog Post</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Title *</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Slug</label>
              <div className="flex gap-2">
                <input className="flex-1 h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none font-mono" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                <button onClick={() => setForm({ ...form, slug: generateSlug(form.title) })} className="px-2 text-xs text-blue-600 hover:text-blue-700 font-medium">Auto</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Category</label>
              <select className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Author</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-500 mb-1 block">Reading Time (min)</label>
              <input type="number" className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.readingTime} onChange={(e) => setForm({ ...form, readingTime: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Featured Image URL</label>
              <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Excerpt</label>
              <textarea className="w-full border-2 border-navy-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none resize-y" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-navy-500 mb-1 block">Content *</label>
              <textarea className="w-full border-2 border-navy-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none resize-y font-mono" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="b-published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="b-published" className="text-sm text-navy-700">Published</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="b-featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="b-featured" className="text-sm text-navy-700">Featured</label>
              </div>
            </div>

            {/* SEO Section */}
            <div className="md:col-span-2 border-t-2 border-navy-100 pt-4">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">SEO Settings</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-navy-500 mb-1 block">SEO Title</label>
                  <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy-500 mb-1 block">Canonical URL</label>
                  <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.canonical} onChange={(e) => setForm({ ...form, canonical: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-navy-500 mb-1 block">SEO Description</label>
                  <textarea className="w-full border-2 border-navy-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none resize-y" rows={2} value={form.seoDesc} onChange={(e) => setForm({ ...form, seoDesc: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-navy-500 mb-1 block">OG Image URL</label>
                  <input className="w-full h-10 border-2 border-navy-200 px-3 text-sm focus:border-blue-600 focus:outline-none" value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} />
                </div>
              </div>
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
              <th className="text-left p-4 text-navy-500 font-medium">Title</th>
              <th className="text-left p-4 text-navy-500 font-medium">Category</th>
              <th className="text-left p-4 text-navy-500 font-medium">Author</th>
              <th className="text-left p-4 text-navy-500 font-medium">Date</th>
              <th className="text-left p-4 text-navy-500 font-medium">Status</th>
              <th className="text-left p-4 text-navy-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-navy-500">No blog posts yet.</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-navy-100 hover:bg-navy-50 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-navy-900">{post.title}</p>
                    <p className="text-xs text-navy-500 font-mono">/{post.slug}</p>
                  </td>
                  <td className="p-4 text-navy-700 text-xs">{post.category}</td>
                  <td className="p-4 text-navy-700 text-sm">{post.author}</td>
                  <td className="p-4 text-navy-500 whitespace-nowrap">{formatDate(post.createdAt)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 ${post.published ? "bg-emerald-100 text-emerald-700" : "bg-navy-100 text-navy-500"}`}>{post.published ? "Published" : "Draft"}</span>
                      {post.featured && <span className="text-xs text-amber-600 font-medium">Featured</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(post)} className="p-1.5 text-navy-400 hover:text-blue-600 transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(post.id)} className="p-1.5 text-navy-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
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
