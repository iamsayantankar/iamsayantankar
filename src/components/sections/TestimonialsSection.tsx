"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { HiStar } from "react-icons/hi2";

interface Testimonial { _id: string; name: string; company: string; position: string; feedback: string; rating: number; }

export default function TestimonialsSection({ data }: { data: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Clients Say" subtitle="Feedback from people I've worked with" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((t, i) => (
            <motion.div key={t._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] hover:shadow-lg transition-shadow">
              <div className="text-4xl text-primary-500/20 font-serif mb-3">&ldquo;</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic leading-relaxed mb-5">{t.feedback}</p>
              <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(j => (<HiStar key={j} className={`w-4 h-4 ${j <= t.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-700"}`} />))}</div>
              <div className="border-t border-gray-100 dark:border-white/5 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">{t.name.charAt(0)}</div>
                <div><h4 className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</h4><p className="text-xs text-gray-500">{t.position} at {t.company}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
