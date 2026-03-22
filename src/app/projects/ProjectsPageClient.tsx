"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { HiMagnifyingGlass, HiArrowTopRightOnSquare, HiCodeBracket } from "react-icons/hi2";

interface Project { _id: string; title: string; slug: string; description: string; technologies: string[]; category: string; githubLink?: string; liveLink?: string; }
const grads = ["from-blue-600 to-cyan-500", "from-purple-600 to-pink-500", "from-emerald-600 to-teal-500", "from-orange-600 to-red-500", "from-indigo-600 to-violet-500", "from-rose-600 to-pink-500"];

export default function ProjectsPageClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const cats = useMemo(() => ["All", ...Array.from(new Set<string>(projects.map((p: Project) => p.category)))], [projects]);

  const filtered = projects.filter(p => (filter === "All" || p.category === filter) && (!search || p.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">My Projects</h1><p className="text-gray-500 dark:text-gray-400">Explore my portfolio of work</p></div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full sm:w-80"><HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" /></div>
            <div className="flex flex-wrap gap-2">{cats.map(c => (<button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"}`}>{c}</button>))}</div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={filter + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <motion.div key={p._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }} className="group rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] overflow-hidden hover:shadow-xl transition-all">
                  <div className={`h-48 bg-gradient-to-br ${grads[i % grads.length]} flex items-center justify-center relative`}>
                    <span className="text-4xl font-bold text-white/30">{p.title.charAt(0)}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                      {p.githubLink && <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"><HiCodeBracket className="w-5 h-5" /></a>}
                      {p.liveLink && <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"><HiArrowTopRightOnSquare className="w-5 h-5" /></a>}
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary-500 mb-2 block">{p.category}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">{p.technologies.slice(0, 4).map(t => (<span key={t} className="px-2.5 py-1 rounded-full text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">{t}</span>))}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && <p className="text-center text-gray-500 py-20">No projects found.</p>}
        </div>
      </section>
    </PageTransition>
  );
}
