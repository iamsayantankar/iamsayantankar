"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiStar } from "react-icons/hi2";

interface Testimonial { _id: string; name: string; company: string; position: string; rating: number; featured: boolean; order: number; }

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/testimonials").then(r => r.json()).then(d => { setTestimonials(Array.isArray(d) ? d : d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Testimonial deleted"); fetchData(); } else toast.error("Failed to delete");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials</h2>
        <Link href="/admin/testimonials/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><HiPlus className="w-4 h-4" /> Add New</Link>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"><th className="text-left px-4 py-3 font-medium text-gray-500">Name</th><th className="text-left px-4 py-3 font-medium text-gray-500">Company</th><th className="text-left px-4 py-3 font-medium text-gray-500">Rating</th><th className="text-left px-4 py-3 font-medium text-gray-500">Featured</th><th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr> : testimonials.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No testimonials found</td></tr> : testimonials.map(t => (
                <tr key={t._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3"><div><p className="font-medium text-gray-900 dark:text-white">{t.name}</p><p className="text-xs text-gray-500">{t.position}</p></div></td>
                  <td className="px-4 py-3 text-gray-500">{t.company}</td>
                  <td className="px-4 py-3"><div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <HiStar key={i} className={`w-4 h-4 ${i < t.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} />)}</div></td>
                  <td className="px-4 py-3">{t.featured ? <span className="text-primary-500">Yes</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/testimonials/${t._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-500"><HiPencil className="w-4 h-4" /></Link><button onClick={() => handleDelete(t._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500"><HiTrash className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
