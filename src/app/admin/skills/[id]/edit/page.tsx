"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";

export default function EditSkill() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    name: "", category: "Frontend", proficiency: 80, icon: "", order: 0,
  });

  useEffect(() => {
    fetch(`/api/skills/${params.id}`).then(r => r.json()).then(d => {
      setForm({ name: d.name || "", category: d.category || "Frontend", proficiency: d.proficiency || 80, icon: d.icon || "", order: d.order || 0 });
      setFetching(false);
    }).catch(() => { toast.error("Failed to load"); setFetching(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/skills/${params.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { toast.success("Skill updated!"); router.push("/admin/skills"); }
      else { const d = await res.json(); toast.error(d.error || "Failed"); }
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  };

  const cls = "w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500";

  if (fetching) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/skills" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><HiArrowLeft className="w-5 h-5 text-gray-500" /></Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Skill</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={cls} required /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={cls}><option>Frontend</option><option>Backend</option><option>Database</option><option>DevOps</option><option>Tools</option><option>Design</option><option>Other</option></select></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proficiency (%)</label><input type="number" min="0" max="100" value={form.proficiency} onChange={e => setForm({...form, proficiency: parseInt(e.target.value) || 0})} className={cls} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label><input type="text" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className={cls} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order</label><input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className={cls} /></div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">{loading ? "Saving..." : "Save Changes"}</button>
          <Link href="/admin/skills" className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
