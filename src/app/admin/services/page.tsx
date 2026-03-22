"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiMagnifyingGlass } from "react-icons/hi2";

interface Service { _id: string; title: string; description: string; icon: string; status: string; order: number; createdAt: string; }

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    setLoading(true);
    fetch("/api/services").then(r => r.json()).then(d => { setServices(Array.isArray(d) ? d : d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Service deleted"); fetchServices(); } else toast.error("Failed to delete");
  };

  const filtered = services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h2>
        <div className="flex gap-3">
          <div className="relative"><HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" /></div>
          <Link href="/admin/services/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><HiPlus className="w-4 h-4" /> Add New</Link>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"><th className="text-left px-4 py-3 font-medium text-gray-500">Title</th><th className="text-left px-4 py-3 font-medium text-gray-500">Icon</th><th className="text-left px-4 py-3 font-medium text-gray-500">Status</th><th className="text-left px-4 py-3 font-medium text-gray-500">Order</th><th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr> : filtered.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No services found</td></tr> : filtered.map(s => (
                <tr key={s._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.title}</td>
                  <td className="px-4 py-3 text-gray-500">{s.icon}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === "active" ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400"}`}>{s.status}</span></td>
                  <td className="px-4 py-3 text-gray-500">{s.order}</td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/services/${s._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-500"><HiPencil className="w-4 h-4" /></Link><button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500"><HiTrash className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
