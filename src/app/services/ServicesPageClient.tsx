"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { HiCodeBracket, HiPaintBrush, HiDevicePhoneMobile, HiCloud, HiCircleStack, HiChartBar } from "react-icons/hi2";

interface Service { _id: string; title: string; description: string; icon: string; features: string[]; }
const iconMap: Record<string, React.ComponentType<{className?: string}>> = { HiCodeBracket, HiPaintBrush, HiDevicePhoneMobile, HiCloud, HiCircleStack, HiChartBar };
const grads = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-emerald-500", "from-orange-500 to-red-500", "from-indigo-500 to-violet-500", "from-pink-500 to-rose-500"];

export default function ServicesPageClient({ services }: { services: Service[] }) {
  return (
    <PageTransition>
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">My Services</h1><p className="text-gray-500 dark:text-gray-400">Comprehensive solutions for your needs</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => { const Icon = iconMap[s.icon] || HiCodeBracket; return (
              <motion.div key={s._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] hover:shadow-xl transition-all">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grads[i % grads.length]} flex items-center justify-center text-white mb-5 shadow-lg`}><Icon className="w-7 h-7" /></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{s.description}</p>
                <ul className="space-y-1.5">{s.features?.map((f, j) => (<li key={j} className="text-sm text-gray-500 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary-500" />{f}</li>))}</ul>
              </motion.div>
            ); })}
          </div>
          <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-r from-primary-600 to-purple-600"><h2 className="text-2xl font-bold text-white mb-4">Have a project in mind?</h2><Link href="/contact" className="inline-block px-8 py-3 rounded-full bg-white text-primary-600 font-medium hover:shadow-lg transition-all">Let&apos;s Talk</Link></div>
        </div>
      </section>
    </PageTransition>
  );
}
