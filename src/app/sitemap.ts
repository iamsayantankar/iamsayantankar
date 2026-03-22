import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Project from "@/models/Project";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/skills`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    await connectDB();

    const blogs = await Blog.find({ status: "published" }).select("slug updatedAt").lean();
    const blogPages = blogs.map((blog: { slug: string; updatedAt?: Date }) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const projects = await Project.find({ status: "published" }).select("slug updatedAt").lean();
    const projectPages = projects.map((project: { slug: string; updatedAt?: Date }) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    dynamicPages = [...blogPages, ...projectPages];
  } catch {
    // Fail silently during build if DB is unavailable
  }

  return [...staticPages, ...dynamicPages];
}
