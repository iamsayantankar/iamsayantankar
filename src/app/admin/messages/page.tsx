"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { HiTrash, HiEnvelope, HiEnvelopeOpen, HiMagnifyingGlass } from "react-icons/hi2";

interface Message { _id: string; name: string; email: string; phone: string; message: string; read: boolean; createdAt: string; }

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = () => {
    setLoading(true);
    fetch("/api/contact").then(r => r.json()).then(d => { setMessages(Array.isArray(d) ? d : d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Message deleted"); if (selected?._id === id) setSelected(null); fetchMessages(); } else toast.error("Failed to delete");
  };

  const markRead = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      await fetch(`/api/contact/${msg._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ read: true }) });
      fetchMessages();
    }
  };

  const filtered = messages.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h2>
        <div className="relative"><HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500" /></div>
      </div>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[600px] overflow-y-auto">
            {loading ? <div className="px-4 py-8 text-center text-gray-500">Loading...</div> : filtered.length === 0 ? <div className="px-4 py-8 text-center text-gray-500">No messages</div> : filtered.map(m => (
              <button key={m._id} onClick={() => markRead(m)} className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selected?._id === m._id ? "bg-primary-50 dark:bg-primary-500/5" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${m.read ? "bg-gray-400" : "bg-gradient-to-br from-primary-500 to-purple-600"}`}>{m.name.charAt(0).toUpperCase()}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${m.read ? "text-gray-600 dark:text-gray-400" : "font-semibold text-gray-900 dark:text-white"}`}>{m.name}</p>
                      {!m.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{m.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">{selected.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{selected.name}</h3>
                    <p className="text-sm text-gray-500">{selected.email}</p>
                    {selected.phone && <p className="text-sm text-gray-500">{selected.phone}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${selected.read ? "text-gray-500" : "text-primary-500 bg-primary-50 dark:bg-primary-500/10"}`}>{selected.read ? <><HiEnvelopeOpen className="w-3.5 h-3.5" /> Read</> : <><HiEnvelope className="w-3.5 h-3.5" /> Unread</>}</span>
                  <button onClick={() => handleDelete(selected._id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500"><HiTrash className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-4">{new Date(selected.createdAt).toLocaleString()}</div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"><p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selected.message}</p></div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400"><HiEnvelope className="w-12 h-12 mb-3" /><p className="text-sm">Select a message to read</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
