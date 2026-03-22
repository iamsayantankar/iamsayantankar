"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
}

const colors = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-emerald-500", "from-orange-500 to-red-500", "from-indigo-500 to-purple-500", "from-pink-500 to-rose-500", "from-cyan-500 to-blue-500", "from-yellow-500 to-orange-500"];

export default function SkillsOverview({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills-overview" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills & Technologies" subtitle="Technologies I work with to bring ideas to life" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.06] hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                {skill.name.substring(0, 2)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
