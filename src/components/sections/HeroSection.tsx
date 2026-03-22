"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiArrowDown } from "react-icons/hi2";

const roles = ["Full Stack Developer", "UI/UX Designer", "Creative Technologist", "Problem Solver"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-primary-500 font-medium mb-4 text-lg"
            >
              Welcome to my portfolio
            </motion.p>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Sayantan Kar</span>
            </h1>

            <div className="h-12 mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              I craft beautiful digital experiences with modern technologies.
              Passionate about building scalable web applications that make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#projects"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="px-8 py-3.5 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:-translate-y-0.5 transition-all duration-300"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/30 to-purple-600/30 blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-primary-500/20">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white">SK</span>
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-blue-500/80 backdrop-blur-sm flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                TS
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-2 -left-6 w-14 h-14 rounded-xl bg-green-500/80 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold shadow-lg"
              >
                JS
              </motion.div>
              <motion.div
                animate={{ y: [-8, 12, -8] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-1/2 -right-8 w-12 h-12 rounded-xl bg-cyan-500/80 backdrop-blur-sm flex items-center justify-center text-white text-sm font-bold shadow-lg"
              >
                Rx
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <HiArrowDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
