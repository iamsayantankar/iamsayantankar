import { Metadata } from "next";
import { getBlogBySlug, getBlogs } from "@/lib/data";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Post Not Found" };
  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt || `Read ${blog.title} by Sayantan Kar`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      type: "article",
      publishedTime: blog.createdAt,
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.title,
    },
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogs(100);
  return blogs.map((blog: { slug: string }) => ({ slug: blog.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();
  return <BlogPostClient blog={blog} />;
}
