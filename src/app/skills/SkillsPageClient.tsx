"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

interface Skill { _id: string; name: string; category: string; proficiency: number; }
const colors: Record<string, string> = { Frontend: "from-blue-500 to-cyan-500", Backend: "from-green-500 to-emerald-500", DevOps: "from-orange-500 to-red-500", Tools: "from-purple-500 to-pink-500" };

export default function SkillsPageClient({ skills }: { skills: Skill[] }) {
  const [active, setActive] = useState("All");

  const cats = useMemo(() => ["All", ...Array.from(new Set(skills.map((s: Skill) => s.category)))], [skills]);

  const filtered = active === "All" ? skills : skills.filter(s => s.category === active);

  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Skills & Expertise</h1><p className="text-gray-500 dark:text-gray-400">Technologies I work with</p></div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {cats.map(c => (<button key={c} onClick={() => setActive(c)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${active === c ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg" : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"}`}>{c}</button>))}
          </div>
          <div className="space-y-5">
            {filtered.map((skill, i) => (
              <motion.div key={skill._id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="flex justify-between mb-2"><span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span><span className="text-sm text-gray-500">{skill.proficiency}%</span></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div className={`h-full rounded-full bg-gradient-to-r ${colors[skill.category] || "from-primary-500 to-purple-500"}`} initial={{ width: 0 }} whileInView={{ width: `${skill.proficiency}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.05 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
