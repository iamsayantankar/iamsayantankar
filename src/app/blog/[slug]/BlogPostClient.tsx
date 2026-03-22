"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft, HiCalendar, HiEye } from "react-icons/hi2";

interface Blog { _id: string; title: string; slug: string; content: string; excerpt?: string; category: string; tags: string[]; views: number; createdAt: string; }

export default function BlogPostClient({ blog }: { blog: Blog }) {
  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-8"><HiArrowLeft className="w-4 h-4" /> Back to Blog</Link>
        <div className="mb-8">
          <span className="text-sm font-medium text-primary-500 mb-3 block">{blog.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><HiCalendar className="w-4 h-4" />{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><HiEye className="w-4 h-4" />{blog.views} views</span>
          </div>
          {blog.tags?.length > 0 && <div className="flex flex-wrap gap-2 mt-4">{blog.tags.map(t => (<span key={t} className="px-3 py-1 rounded-full text-xs bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">{t}</span>))}</div>}
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </motion.article>
  );
}
