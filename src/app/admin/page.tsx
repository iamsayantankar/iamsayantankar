"use client";
import { useState, useEffect } from "react";
import { HiRectangleGroup, HiDocumentText, HiEnvelope, HiChatBubbleLeftRight } from "react-icons/hi2";

interface DashData { stats: { projects: number; blogs: number; messages: number; unreadMessages: number; testimonials: number }; recentMessages: { _id: string; name: string; email: string; message: string; read: boolean; createdAt: string }[]; recentProjects: { _id: string; title: string; category: string; createdAt: string }[]; }

export default function AdminDashboard() {
  const [data, setData] = useState<DashData | null>(null);
  useEffect(() => { fetch("/api/dashboard").then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);

  const stats = [
    { label: "Projects", value: data?.stats.projects || 0, icon: HiRectangleGroup, color: "from-blue-500 to-cyan-500" },
    { label: "Blog Posts", value: data?.stats.blogs || 0, icon: HiDocumentText, color: "from-purple-500 to-pink-500" },
    { label: "Messages", value: data?.stats.unreadMessages || 0, icon: HiEnvelope, color: "from-orange-500 to-red-500", suffix: " unread" },
    { label: "Testimonials", value: data?.stats.testimonials || 0, icon: HiChatBubbleLeftRight, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Welcome back!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-3"><div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white`}><s.icon className="w-5 h-5" /></div></div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}{s.suffix || ""}</div>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Messages</h3>
          <div className="space-y-3">{data?.recentMessages?.map(m => (
            <div key={m._id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{m.name.charAt(0)}</div>
              <div className="min-w-0"><p className="font-medium text-sm text-gray-900 dark:text-white">{m.name}</p><p className="text-xs text-gray-500 truncate">{m.message}</p></div>
              {!m.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-2" />}
            </div>
          ))}</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Projects</h3>
          <div className="space-y-3">{data?.recentProjects?.map(p => (
            <div key={p._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div><p className="font-medium text-sm text-gray-900 dark:text-white">{p.title}</p><p className="text-xs text-gray-500">{p.category}</p></div>
              <span className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</span>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}
