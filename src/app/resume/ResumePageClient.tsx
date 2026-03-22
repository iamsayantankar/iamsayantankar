"use client";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { HiArrowDownTray, HiBuildingOffice2, HiAcademicCap } from "react-icons/hi2";

interface Exp { _id: string; company: string; position: string; duration: string; description: string; technologies: string[]; current: boolean; }
interface Edu { _id: string; institution: string; degree: string; field: string; year: string; description?: string; grade?: string; }

export default function ResumePageClient({ experience, education }: { experience: Exp[]; education: Edu[] }) {
  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">My Resume</h1><a href="/resume.pdf" download className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"><HiArrowDownTray className="w-5 h-5" /> Download CV</a></div>
          <div className="mb-16"><h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2"><HiBuildingOffice2 className="w-6 h-6 text-primary-500" /> Work Experience</h2>
            <div className="space-y-6">{experience.map((e, i) => (<motion.div key={e._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06]"><div className="flex flex-wrap justify-between gap-2 mb-2"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">{e.position} @ {e.company}</h3><span className={`px-3 py-1 rounded-full text-xs font-medium ${e.current ? "bg-green-100 dark:bg-green-500/10 text-green-600" : "bg-gray-100 dark:bg-white/5 text-gray-500"}`}>{e.duration}</span></div><p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{e.description}</p><div className="flex flex-wrap gap-1.5">{e.technologies?.map(t => (<span key={t} className="px-2 py-0.5 rounded-full text-xs bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">{t}</span>))}</div></motion.div>))}</div>
          </div>
          <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2"><HiAcademicCap className="w-6 h-6 text-green-500" /> Education</h2>
            <div className="space-y-6">{education.map((e, i) => (<motion.div key={e._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06]"><div className="flex flex-wrap justify-between gap-2 mb-2"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">{e.degree} in {e.field}</h3><span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-white/5 text-gray-500">{e.year}</span></div><p className="text-green-500 font-medium text-sm mb-2">{e.institution}{e.grade && ` - ${e.grade}`}</p>{e.description && <p className="text-sm text-gray-500">{e.description}</p>}</motion.div>))}</div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
