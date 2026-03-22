"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { HiMagnifyingGlass, HiCalendar, HiArrowRight } from "react-icons/hi2";

interface Blog { _id: string; title: string; slug: string; excerpt?: string; category: string; tags: string[]; createdAt: string; }
const grads = ["from-indigo-600 to-purple-600", "from-blue-600 to-cyan-600", "from-emerald-600 to-teal-600", "from-orange-600 to-red-600"];

export default function BlogPageClient({ blogs }: { blogs: Blog[] }) {
  const [search, setSearch] = useState("");

  const filtered = blogs.filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Blog</h1><p className="text-gray-500 dark:text-gray-400">Thoughts, tutorials, and insights</p></div>
          <div className="max-w-md mx-auto mb-10 relative"><HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" /></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b, i) => (
              <motion.div key={b._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] overflow-hidden hover:shadow-lg transition-all">
                <div className={`h-40 bg-gradient-to-br ${grads[i % grads.length]} flex items-center justify-center`}><span className="text-5xl font-bold text-white/20">{b.title.charAt(0)}</span></div>
                <div className="p-5"><span className="text-xs font-medium text-primary-500 mb-2 block">{b.category}</span><h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">{b.title}</h3><p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{b.excerpt || "Click to read more..."}</p>
                  <div className="flex items-center justify-between"><span className="text-xs text-gray-400 flex items-center gap-1"><HiCalendar className="w-3.5 h-3.5" />{new Date(b.createdAt).toLocaleDateString()}</span><Link href={`/blog/${b.slug}`} className="text-primary-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">Read More <HiArrowRight className="w-4 h-4" /></Link></div>
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-gray-500 py-20">No articles found.</p>}
        </div>
      </section>
    </PageTransition>
  );
}
