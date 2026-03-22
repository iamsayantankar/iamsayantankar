"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiMagnifyingGlass } from "react-icons/hi2";

interface Skill { _id: string; name: string; category: string; proficiency: number; icon: string; order: number; }

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSkills = () => {
    setLoading(true);
    fetch("/api/skills").then(r => r.json()).then(d => { setSkills(Array.isArray(d) ? d : d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchSkills(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Skill deleted"); fetchSkills(); } else toast.error("Failed to delete");
  };

  const filtered = skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
        <div className="flex gap-3">
          <div className="relative"><HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" /></div>
          <Link href="/admin/skills/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><HiPlus className="w-4 h-4" /> Add New</Link>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"><th className="text-left px-4 py-3 font-medium text-gray-500">Name</th><th className="text-left px-4 py-3 font-medium text-gray-500">Category</th><th className="text-left px-4 py-3 font-medium text-gray-500">Proficiency</th><th className="text-left px-4 py-3 font-medium text-gray-500">Order</th><th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr> : filtered.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No skills found</td></tr> : filtered.map(s => (
                <tr key={s._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                  <td className="px-4 py-3 text-gray-500">{s.category}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700"><div className="h-full rounded-full bg-primary-500" style={{ width: `${s.proficiency}%` }} /></div><span className="text-gray-500 text-xs">{s.proficiency}%</span></div></td>
                  <td className="px-4 py-3 text-gray-500">{s.order}</td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/skills/${s._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-500"><HiPencil className="w-4 h-4" /></Link><button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500"><HiTrash className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
