"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiMagnifyingGlass, HiEye } from "react-icons/hi2";

interface Blog { _id: string; title: string; slug: string; category: string; status: string; featured: boolean; views: number; createdAt: string; }

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    setLoading(true);
    fetch("/api/blogs?limit=100").then(r => r.json()).then(d => { setBlogs(d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
    if (res.ok) { toast.success("Blog deleted"); fetchBlogs(); } else toast.error("Failed to delete");
  };

  const filtered = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h2>
        <div className="flex gap-3">
          <div className="relative"><HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" /></div>
          <Link href="/admin/blogs/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"><HiPlus className="w-4 h-4" /> Add New</Link>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"><th className="text-left px-4 py-3 font-medium text-gray-500">Title</th><th className="text-left px-4 py-3 font-medium text-gray-500">Category</th><th className="text-left px-4 py-3 font-medium text-gray-500">Status</th><th className="text-left px-4 py-3 font-medium text-gray-500">Views</th><th className="text-left px-4 py-3 font-medium text-gray-500">Date</th><th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr> : filtered.length === 0 ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No blog posts found</td></tr> : filtered.map(b => (
                <tr key={b._id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{b.title}</td>
                  <td className="px-4 py-3 text-gray-500">{b.category}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === "published" ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"}`}>{b.status}</span></td>
                  <td className="px-4 py-3 text-gray-500"><span className="flex items-center gap-1"><HiEye className="w-3.5 h-3.5" /> {b.views || 0}</span></td>
                  <td className="px-4 py-3 text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/blogs/${b._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-primary-500"><HiPencil className="w-4 h-4" /></Link><button onClick={() => handleDelete(b._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500"><HiTrash className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
