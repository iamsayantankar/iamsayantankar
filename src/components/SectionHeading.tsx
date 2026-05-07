"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-10 sm:mb-16 ${center ? "text-center" : ""}`}
    >
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 ${center ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
