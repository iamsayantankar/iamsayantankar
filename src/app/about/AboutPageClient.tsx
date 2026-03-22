"use client";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function AboutPageClient() {
  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">About Me</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Passionate developer crafting digital experiences</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="w-full h-80 rounded-3xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center"><span className="text-8xl font-bold text-white/30">SK</span></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Full Stack Developer & Creative Technologist</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>I&apos;m a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, performant, and user-friendly applications that solve real-world problems.</p>
                <p>With years of experience in the industry, I&apos;ve worked with startups and enterprises to deliver high-quality software solutions. My focus is on writing clean, maintainable code and creating exceptional user experiences.</p>
                <p>When I&apos;m not coding, you can find me exploring new technologies, writing blog posts, or contributing to open-source projects.</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[{ n: "3+", l: "Years Exp" }, { n: "50+", l: "Projects" }, { n: "30+", l: "Clients" }].map(s => (
                  <div key={s.l} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06]">
                    <div className="text-2xl font-bold gradient-text">{s.n}</div><p className="text-sm text-gray-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
