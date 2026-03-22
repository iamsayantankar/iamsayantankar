"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { HiCodeBracket, HiPaintBrush, HiDevicePhoneMobile, HiCloud, HiCircleStack, HiChartBar } from "react-icons/hi2";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiCodeBracket, HiPaintBrush, HiDevicePhoneMobile, HiCloud, HiCircleStack, HiChartBar,
};

const gradients = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-emerald-500", "from-orange-500 to-red-500", "from-indigo-500 to-violet-500", "from-pink-500 to-rose-500"];

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-20 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Services I Offer" subtitle="Comprehensive solutions to bring your vision to life" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || HiCodeBracket;
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] backdrop-blur-sm border border-gray-200/50 dark:border-white/[0.06] hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white mb-5 shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                {service.features?.length > 0 && (
                  <ul className="space-y-1.5">
                    {service.features.map((f, j) => (
                      <li key={j} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
