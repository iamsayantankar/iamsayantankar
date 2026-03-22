"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";

export default function NewTestimonial() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", position: "", feedback: "", photo: "", rating: 5, featured: false, order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { toast.success("Testimonial created!"); router.push("/admin/testimonials"); }
      else { const d = await res.json(); toast.error(d.error || "Failed"); }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  };

  const cls = "w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/testimonials" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiArrowLeft className="w-5 h-5 text-gray-500" /></Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Testimonial</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={cls} required /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label><input type="text" value={form.position} onChange={e => setForm({...form, position: e.target.value})} className={cls} /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label><input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className={cls} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label><input type="text" value={form.photo} onChange={e => setForm({...form, photo: e.target.value})} className={cls} /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feedback *</label><textarea rows={4} value={form.feedback} onChange={e => setForm({...form, feedback: e.target.value})} className={`${cls} resize-none`} required /></div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating (1-5)</label><input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({...form, rating: parseInt(e.target.value) || 5})} className={cls} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className={cls} /></div>
          <div className="flex items-end pb-1"><label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" /> Featured</label></div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">{loading ? "Creating..." : "Create Testimonial"}</button>
          <Link href="/admin/testimonials" className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
