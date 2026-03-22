"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { HiArrowDownTray } from "react-icons/hi2";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = target / 60;
    const id = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(id); } else setCount(Math.floor(n)); }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ResumeSection() {
  return (
    <section id="resume" className="py-20 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="My Resume" subtitle="A summary of my professional experience" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[{ l: "Years Experience", v: 3, s: "+" }, { l: "Projects Completed", v: 50, s: "+" }, { l: "Happy Clients", v: 30, s: "+" }, { l: "Technologies", v: 15, s: "+" }].map((stat, i) => (
            <motion.div key={stat.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06]">
              <div className="text-3xl font-bold gradient-text mb-1"><Counter target={stat.v} suffix={stat.s} /></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.l}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium shadow-lg shadow-primary-500/25 hover:shadow-xl transition-all"><HiArrowDownTray className="w-5 h-5" /> Download CV</a>
        </div>
      </div>
    </section>
  );
}
