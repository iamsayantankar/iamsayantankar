import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Contact from "@/models/Contact";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const [projects, blogs, messages, unreadMessages, testimonials] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
      Testimonial.countDocuments(),
    ]);

    const recentMessages = await Contact.find().sort({ createdAt: -1 }).limit(5);
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5);

    return NextResponse.json({
      stats: { projects, blogs, messages, unreadMessages, testimonials },
      recentMessages,
      recentProjects,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
