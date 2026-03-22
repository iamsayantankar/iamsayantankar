"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { HiArrowRight, HiCalendar } from "react-icons/hi2";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category: string;
  tags: string[];
  createdAt: string;
}

const gradients = ["from-indigo-600 to-purple-600", "from-blue-600 to-cyan-600", "from-emerald-600 to-teal-600"];

export default function BlogPreview({ blogs }: { blogs: Blog[] }) {
  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Latest Articles" subtitle="Thoughts, tutorials, and insights" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl bg-white dark:bg-white/[0.04] border border-gray-200/50 dark:border-white/[0.06] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                <span className="text-5xl font-bold text-white/20">{blog.title.charAt(0)}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary-500 mb-2 block">{blog.category}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {blog.excerpt || "Click to read more..."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <HiCalendar className="w-3.5 h-3.5" />
                    {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <Link href={`/blog/${blog.slug}`} className="text-primary-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-primary-500 hover:text-primary-600 transition-all">
            View All Posts <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
