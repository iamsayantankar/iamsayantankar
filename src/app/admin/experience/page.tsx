"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";

interface Experience { _id: string; company: string; position: string; duration: string; current: boolean; order: number; }

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/experience").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Experience deleted"); fetchData(); } else toast.error("Failed to delete");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h2>
        <Link href="/admin/experience/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><HiPlus className="w-4 h-4" /> Add New</Link>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"><th className="text-left px-4 py-3 font-medium text-gray-500">Position</th><th className="text-left px-4 py-3 font-medium text-gray-500">Company</th><th className="text-left px-4 py-3 font-medium text-gray-500">Duration</th><th className="text-left px-4 py-3 font-medium text-gray-500">Current</th><th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr> : items.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No experience found</td></tr> : items.map(item => (
                <tr key={item._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{item.position}</td>
                  <td className="px-4 py-3 text-gray-500">{item.company}</td>
                  <td className="px-4 py-3 text-gray-500">{item.duration}</td>
                  <td className="px-4 py-3">{item.current ? <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400">Current</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/experience/${item._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-500"><HiPencil className="w-4 h-4" /></Link><button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500"><HiTrash className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
