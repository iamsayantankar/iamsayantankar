"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import toast from "react-hot-toast";
import { HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane } from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill required fields"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { toast.success("Message sent!"); setForm({ name: "", email: "", phone: "", message: "" }); } else toast.error("Failed to send");
    } catch { toast.error("Something went wrong"); }
    setLoading(false);
  };
  const cls = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all";

  return (
    <section id="contact" className="py-20 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get In Touch" subtitle="Have a project? Let's work together" />
        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Let&apos;s talk</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">I&apos;m always open to new projects and opportunities.</p>
            <div className="space-y-4 mb-8">
              {[{ icon: HiEnvelope, l: "Email", v: "hello@sayantankar.dev" }, { icon: HiPhone, l: "Phone", v: "+91 12345 67890" }, { icon: HiMapPin, l: "Location", v: "Kolkata, India" }].map(item => (
                <div key={item.l} className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500"><item.icon className="w-5 h-5" /></div><div><p className="text-sm text-gray-500">{item.l}</p><p className="font-medium text-gray-900 dark:text-white">{item.v}</p></div></div>
              ))}
            </div>
            <div className="flex gap-3">{[{ icon: FaGithub, h: "https://github.com" }, { icon: FaLinkedin, h: "https://linkedin.com" }, { icon: FaTwitter, h: "https://twitter.com" }].map((s, i) => (<a key={i} href={s.h} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all"><s.icon className="w-5 h-5" /></a>))}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] shadow-lg">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={cls} required /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={cls} required /></div>
              </div>
              <div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={cls} /></div>
              <div className="mb-6"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label><textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${cls} resize-none`} required /></div>
              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50">{loading ? "Sending..." : <><HiPaperAirplane className="w-5 h-5" /> Send Message</>}</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
