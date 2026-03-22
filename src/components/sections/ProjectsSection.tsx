"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { HiArrowTopRightOnSquare, HiCodeBracket } from "react-icons/hi2";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  category: string;
  githubLink?: string;
  liveLink?: string;
  featured: boolean;
}

const gradients = ["from-blue-600 to-cyan-500", "from-purple-600 to-pink-500", "from-emerald-600 to-teal-500", "from-orange-600 to-red-500", "from-indigo-600 to-violet-500", "from-rose-600 to-pink-500"];

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Featured Projects" subtitle="A selection of my recent work" />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/25"
                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center relative`}>
                  <span className="text-4xl font-bold text-white/30">{project.title.charAt(0)}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <HiCodeBracket className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <HiArrowTopRightOnSquare className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary-500 mb-2 block">{project.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-full text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
          >
            View All Projects
            <HiArrowTopRightOnSquare className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
