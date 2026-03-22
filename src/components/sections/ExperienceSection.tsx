"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { HiBuildingOffice2 } from "react-icons/hi2";

interface Experience { _id: string; company: string; position: string; duration: string; description: string; technologies: string[]; current: boolean; }

export default function ExperienceSection({ data }: { data: Experience[] }) {
  return (
    <section id="experience" className="py-20 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Work Experience" subtitle="My professional journey" />
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-purple-500 to-transparent" />
          <div className="space-y-8">
            {data.map((exp, i) => (
              <motion.div key={exp._id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative pl-20">
                <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 border-4 border-white dark:border-gray-950 shadow-md z-10" />
                <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] hover:shadow-lg transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                      <p className="text-primary-500 font-medium flex items-center gap-1.5"><HiBuildingOffice2 className="w-4 h-4" /> {exp.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${exp.current ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-white/5 text-gray-500"}`}>{exp.duration}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies?.map(t => (<span key={t} className="px-2 py-0.5 rounded-full text-xs bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">{t}</span>))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
