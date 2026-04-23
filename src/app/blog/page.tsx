import { Metadata } from "next";
import { getBlogs } from "@/lib/data";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read articles, tutorials, and insights about web development, programming, and technology by Sayantan Kar.",
  openGraph: {
    title: "Blog | Sayantan Kar",
    description: "Read articles, tutorials, and insights about web development and technology.",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs(50);
  return <BlogPageClient blogs={blogs} />;
}
