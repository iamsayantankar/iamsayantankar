import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Project from "@/models/Project";
import Service from "@/models/Service";
import Skill from "@/models/Skill";
import Testimonial from "@/models/Testimonial";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Settings from "@/models/Settings";

export async function getBlogs(limit = 20, query: Record<string, unknown> = {}) {
  await connectDB();
  const filter = { status: "published", ...query };
  const data = await Blog.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getBlogBySlug(slug: string) {
  await connectDB();
  const blog = await Blog.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();
  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

export async function getProjects(limit = 50) {
  await connectDB();
  const data = await Project.find({ status: "published" }).sort({ order: 1, createdAt: -1 }).limit(limit).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getServices() {
  await connectDB();
  const data = await Service.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getSkills() {
  await connectDB();
  const data = await Skill.find({}).sort({ category: 1, proficiency: -1 }).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getTestimonials() {
  await connectDB();
  const data = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getExperience() {
  await connectDB();
  const data = await Experience.find({}).sort({ current: -1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getEducation() {
  await connectDB();
  const data = await Education.find({}).sort({ year: -1 }).lean();
  return JSON.parse(JSON.stringify(data));
}

export async function getSettings() {
  await connectDB();
  const settings = await Settings.findOne({}).lean();
  return settings ? JSON.parse(JSON.stringify(settings)) : null;
}
