"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiMagnifyingGlass } from "react-icons/hi2";

interface Project { _id: string; title: string; category: string; status: string; featured: boolean; createdAt: string; }

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/projects?limit=100").then(r => r.json()).then(d => { setProjects(d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Project deleted"); fetchProjects(); } else toast.error("Failed to delete");
  };

  const filtered = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <div className="flex gap-3">
          <div className="relative"><HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" /></div>
          <Link href="/admin/projects/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><HiPlus className="w-4 h-4" /> Add New</Link>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"><th className="text-left px-4 py-3 font-medium text-gray-500">Title</th><th className="text-left px-4 py-3 font-medium text-gray-500">Category</th><th className="text-left px-4 py-3 font-medium text-gray-500">Status</th><th className="text-left px-4 py-3 font-medium text-gray-500">Featured</th><th className="text-left px-4 py-3 font-medium text-gray-500">Date</th><th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr> : filtered.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No projects found</td></tr> : filtered.map(p => (
                <tr key={p._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{p.title}</td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "published" ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"}`}>{p.status}</span></td>
                  <td className="px-4 py-3">{p.featured ? <span className="text-primary-500">Yes</span> : <span className="text-gray-400">No</span>}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/projects/${p._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-500"><HiPencil className="w-4 h-4" /></Link><button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500"><HiTrash className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
