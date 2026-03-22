"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi2";

interface Education { _id: string; institution: string; degree: string; field: string; year: string; grade: string; order: number; }

export default function AdminEducation() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/education").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this education entry?")) return;
    const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Education deleted"); fetchData(); } else toast.error("Failed to delete");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
        <Link href="/admin/education/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><HiPlus className="w-4 h-4" /> Add New</Link>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"><th className="text-left px-4 py-3 font-medium text-gray-500">Institution</th><th className="text-left px-4 py-3 font-medium text-gray-500">Degree</th><th className="text-left px-4 py-3 font-medium text-gray-500">Field</th><th className="text-left px-4 py-3 font-medium text-gray-500">Year</th><th className="text-left px-4 py-3 font-medium text-gray-500">Grade</th><th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr> : items.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No education found</td></tr> : items.map(item => (
                <tr key={item._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{item.institution}</td>
                  <td className="px-4 py-3 text-gray-500">{item.degree}</td>
                  <td className="px-4 py-3 text-gray-500">{item.field}</td>
                  <td className="px-4 py-3 text-gray-500">{item.year}</td>
                  <td className="px-4 py-3 text-gray-500">{item.grade}</td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/education/${item._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-500"><HiPencil className="w-4 h-4" /></Link><button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500"><HiTrash className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
