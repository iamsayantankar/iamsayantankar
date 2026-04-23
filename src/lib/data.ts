import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Project from "@/models/Project";
import Service from "@/models/Service";
import Skill from "@/models/Skill";
import Testimonial from "@/models/Testimonial";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Settings from "@/models/Settings";

// Wraps a DB-backed data fetch so a missing env var or transient Mongo
// failure never aborts `next build` / page render — callers get the fallback.
async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn("[data]", (err as Error).message);
    return fallback;
  }
}

function toPlain<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

export async function getBlogs(limit = 20, query: Record<string, unknown> = {}) {
  return safeFetch(async () => {
    await connectDB();
    const filter = { status: "published", ...query };
    const data = await Blog.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    return toPlain(data);
  }, [] as unknown[]);
}

export async function getBlogBySlug(slug: string) {
  return safeFetch(async () => {
    await connectDB();
    const blog = await Blog.findOneAndUpdate(
      { slug, status: "published" },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    return blog ? toPlain(blog) : null;
  }, null as unknown);
}

export async function getProjects(limit = 50) {
  return safeFetch(async () => {
    await connectDB();
    const data = await Project.find({ status: "published" })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();
    return toPlain(data);
  }, [] as unknown[]);
}

export async function getServices() {
  return safeFetch(async () => {
    await connectDB();
    const data = await Service.find({}).sort({ order: 1 }).lean();
    return toPlain(data);
  }, [] as unknown[]);
}

export async function getSkills() {
  return safeFetch(async () => {
    await connectDB();
    const data = await Skill.find({}).sort({ category: 1, proficiency: -1 }).lean();
    return toPlain(data);
  }, [] as unknown[]);
}

export async function getTestimonials() {
  return safeFetch(async () => {
    await connectDB();
    const data = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
    return toPlain(data);
  }, [] as unknown[]);
}

export async function getExperience() {
  return safeFetch(async () => {
    await connectDB();
    const data = await Experience.find({}).sort({ current: -1, createdAt: -1 }).lean();
    return toPlain(data);
  }, [] as unknown[]);
}

export async function getEducation() {
  return safeFetch(async () => {
    await connectDB();
    const data = await Education.find({}).sort({ year: -1 }).lean();
    return toPlain(data);
  }, [] as unknown[]);
}

export async function getSettings() {
  return safeFetch(async () => {
    await connectDB();
    const settings = await Settings.findOne({}).lean();
    return settings ? toPlain(settings) : null;
  }, null as unknown);
}
