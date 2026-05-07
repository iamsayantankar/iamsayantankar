"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function isoToLocalInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function localInputToIso(local: string): string | null {
  if (!local) return null;
  const d = new Date(local);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    siteName: "", siteDescription: "", heroTitle: "", heroSubtitle: "", heroBio: "", heroImage: "",
    aboutText: "", email: "", phone: "", address: "",
    github: "", linkedin: "", twitter: "", instagram: "",
    seoTitle: "", seoDescription: "", seoKeywords: "",
    maintenanceMode: false, maintenanceTitle: "", maintenanceMessage: "", maintenanceEndDate: "",
  });

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      setForm({
        siteName: d.siteName || "", siteDescription: d.siteDescription || "",
        heroTitle: d.heroTitle || "", heroSubtitle: d.heroSubtitle || "", heroBio: d.heroBio || "", heroImage: d.heroImage || "",
        aboutText: d.aboutText || "", email: d.email || "", phone: d.phone || "", address: d.address || "",
        github: d.socialLinks?.github || "", linkedin: d.socialLinks?.linkedin || "",
        twitter: d.socialLinks?.twitter || "", instagram: d.socialLinks?.instagram || "",
        seoTitle: d.seoTitle || "", seoDescription: d.seoDescription || "",
        seoKeywords: (d.seoKeywords || []).join(", "),
        maintenanceMode: !!d.maintenanceMode,
        maintenanceTitle: d.maintenanceTitle || "",
        maintenanceMessage: d.maintenanceMessage || "",
        maintenanceEndDate: isoToLocalInput(d.maintenanceEndDate),
      });
      setFetching(false);
    }).catch(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        siteName: form.siteName, siteDescription: form.siteDescription,
        heroTitle: form.heroTitle, heroSubtitle: form.heroSubtitle, heroBio: form.heroBio, heroImage: form.heroImage,
        aboutText: form.aboutText, email: form.email, phone: form.phone, address: form.address,
        socialLinks: { github: form.github, linkedin: form.linkedin, twitter: form.twitter, instagram: form.instagram },
        seoTitle: form.seoTitle, seoDescription: form.seoDescription,
        seoKeywords: form.seoKeywords.split(",").map(k => k.trim()).filter(Boolean),
        maintenanceMode: form.maintenanceMode,
        maintenanceTitle: form.maintenanceTitle,
        maintenanceMessage: form.maintenanceMessage,
        maintenanceEndDate: localInputToIso(form.maintenanceEndDate),
      };
      const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) toast.success("Settings saved!");
      else toast.error("Failed to save");
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  };

  const cls = "w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary-500";

  if (fetching) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6">Site Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 sm:space-y-8">
        {/* Maintenance Mode */}
        <div className={`p-4 sm:p-5 rounded-xl border space-y-4 transition-colors ${form.maintenanceMode ? "bg-amber-50 dark:bg-amber-500/5 border-amber-300 dark:border-amber-500/30" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"}`}>
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white flex flex-wrap items-center gap-2">
                Maintenance Mode
                {form.maintenanceMode && <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Live</span>}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Visitors see a coming-soon page; admins still see the full site. Auto-disables when the end date passes.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={form.maintenanceMode}
              aria-label="Toggle maintenance mode"
              onClick={() => setForm({ ...form, maintenanceMode: !form.maintenanceMode })}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors mt-1 ${form.maintenanceMode ? "bg-amber-500" : "bg-gray-300 dark:bg-gray-700"}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${form.maintenanceMode ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
              <input type="text" value={form.maintenanceTitle} onChange={e => setForm({ ...form, maintenanceTitle: e.target.value })} placeholder="We'll Be Back Soon!" className={cls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goes Live At</label>
              <input type="datetime-local" value={form.maintenanceEndDate} onChange={e => setForm({ ...form, maintenanceEndDate: e.target.value })} className={cls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea rows={3} value={form.maintenanceMessage} onChange={e => setForm({ ...form, maintenanceMessage: e.target.value })} placeholder="We're performing scheduled maintenance..." className={`${cls} resize-none`} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Leave &quot;Goes Live At&quot; blank to stay in maintenance until manually toggled off.</p>
        </div>

        {/* General */}
        <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">General</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Name</label><input type="text" value={form.siteName} onChange={e => setForm({...form, siteName: e.target.value})} className={cls} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site Description</label><input type="text" value={form.siteDescription} onChange={e => setForm({...form, siteDescription: e.target.value})} className={cls} /></div>
          </div>
        </div>

        {/* Hero */}
        <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Hero Section</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Title</label><input type="text" value={form.heroTitle} onChange={e => setForm({...form, heroTitle: e.target.value})} className={cls} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Subtitle</label><input type="text" value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} className={cls} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Bio</label><textarea rows={3} value={form.heroBio} onChange={e => setForm({...form, heroBio: e.target.value})} className={`${cls} resize-none`} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Image URL</label><input type="text" value={form.heroImage} onChange={e => setForm({...form, heroImage: e.target.value})} className={cls} /></div>
        </div>

        {/* About */}
        <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">About</h3>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Text</label><textarea rows={4} value={form.aboutText} onChange={e => setForm({...form, aboutText: e.target.value})} className={`${cls} resize-none`} /></div>
        </div>

        {/* Contact Info */}
        <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Contact Info</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={cls} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={cls} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label><input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className={cls} /></div>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Social Links</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub</label><input type="url" value={form.github} onChange={e => setForm({...form, github: e.target.value})} className={cls} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn</label><input type="url" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} className={cls} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter</label><input type="url" value={form.twitter} onChange={e => setForm({...form, twitter: e.target.value})} className={cls} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram</label><input type="url" value={form.instagram} onChange={e => setForm({...form, instagram: e.target.value})} className={cls} /></div>
          </div>
        </div>

        {/* SEO */}
        <div className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">SEO Settings</h3>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Title</label><input type="text" value={form.seoTitle} onChange={e => setForm({...form, seoTitle: e.target.value})} className={cls} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Description</label><textarea rows={2} value={form.seoDescription} onChange={e => setForm({...form, seoDescription: e.target.value})} className={`${cls} resize-none`} /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SEO Keywords (comma separated)</label><input type="text" value={form.seoKeywords} onChange={e => setForm({...form, seoKeywords: e.target.value})} className={cls} /></div>
        </div>

        <button type="submit" disabled={loading} className="px-8 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-50">{loading ? "Saving..." : "Save Settings"}</button>
      </form>
    </div>
  );
}
