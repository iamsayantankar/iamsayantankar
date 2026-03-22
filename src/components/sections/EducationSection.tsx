"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { HiAcademicCap } from "react-icons/hi2";

interface Education { _id: string; institution: string; degree: string; field: string; year: string; description?: string; grade?: string; }

export default function EducationSection({ data }: { data: Education[] }) {
  return (
    <section id="education" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Education" subtitle="My academic background" />
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-500 via-emerald-500 to-transparent" />
          <div className="space-y-8">
            {data.map((edu, i) => (
              <motion.div key={edu._id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative pl-20">
                <div className="absolute left-[18px] top-6 w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-white dark:border-gray-950 shadow-md flex items-center justify-center z-10">
                  <HiAcademicCap className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06]">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div><h3 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree} in {edu.field}</h3><p className="text-green-500 font-medium">{edu.institution}</p></div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-500">{edu.year}</span>
                      {edu.grade && <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400">{edu.grade}</span>}
                    </div>
                  </div>
                  {edu.description && <p className="text-sm text-gray-500 dark:text-gray-400">{edu.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
