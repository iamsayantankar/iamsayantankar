"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";

export default function NewBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "", category: "Technology",
    tags: "", featuredImage: "", seoTitle: "", seoDescription: "",
    featured: false, status: "published",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...form,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      };
      const res = await fetch("/api/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { toast.success("Blog post created!"); router.push("/admin/blogs"); }
      else { const d = await res.json(); toast.error(d.error || "Failed"); }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  };

  const cls = "w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blogs" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiArrowLeft className="w-5 h-5 text-gray-500" /></Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Blog Post</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label><input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={cls} required /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label><input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className={cls} placeholder="auto-generated" /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label><textarea rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className={`${cls} resize-none`} /></div>
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content (HTML) *</label><textarea rows={10} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className={`${cls} resize-none`} required /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={cls}><option>Technology</option><option>Web Development</option><option>Design</option><option>Tutorial</option><option>Career</option><option>Other</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={cls}><option value="published">Published</option><option value="draft">Draft</option></select></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label><input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className={cls} placeholder="React, Next.js, Tutorial" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Featured Image URL</label><input type="text" value={form.featuredImage} onChange={e => setForm({...form, featuredImage: e.target.value})} className={cls} /></div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">SEO Settings</h4>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label><input type="text" value={form.seoTitle} onChange={e => setForm({...form, seoTitle: e.target.value})} className={cls} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label><textarea rows={2} value={form.seoDescription} onChange={e => setForm({...form, seoDescription: e.target.value})} className={`${cls} resize-none`} /></div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" /> Featured Post</label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">{loading ? "Creating..." : "Create Post"}</button>
          <Link href="/admin/blogs" className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
