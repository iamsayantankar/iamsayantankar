"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";

export default function EditService() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: "", description: "", icon: "", features: "", order: 0, status: "active",
  });

  useEffect(() => {
    fetch(`/api/services/${params.id}`).then(r => r.json()).then(d => {
      setForm({
        title: d.title || "", description: d.description || "", icon: d.icon || "",
        features: (d.features || []).join("\n"), order: d.order || 0, status: d.status || "active",
      });
      setFetching(false);
    }).catch(() => { toast.error("Failed to load"); setFetching(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = { ...form, features: form.features.split("\n").map(f => f.trim()).filter(Boolean) };
      const res = await fetch(`/api/services/${params.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { toast.success("Service updated!"); router.push("/admin/services"); }
      else { const d = await res.json(); toast.error(d.error || "Failed"); }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  };

  const cls = "w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500";

  if (fetching) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/services" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiArrowLeft className="w-5 h-5 text-gray-500" /></Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Service</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label><input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={cls} required /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon Name</label><input type="text" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className={cls} /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label><textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={`${cls} resize-none`} required /></div>
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Features (one per line)</label><textarea rows={5} value={form.features} onChange={e => setForm({...form, features: e.target.value})} className={`${cls} resize-none`} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={cls}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className={cls} /></div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">{loading ? "Saving..." : "Save Changes"}</button>
          <Link href="/admin/services" className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
