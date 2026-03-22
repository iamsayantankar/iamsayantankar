import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    let blog;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      blog = await Blog.findById(params.slug);
    } else {
      blog = await Blog.findOneAndUpdate(
        { slug: params.slug },
        { $inc: { views: 1 } },
        { new: true }
      );
    }
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();
    let blog;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      blog = await Blog.findByIdAndUpdate(params.slug, body, { new: true });
    } else {
      blog = await Blog.findOneAndUpdate({ slug: params.slug }, body, { new: true });
    }
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      await Blog.findByIdAndDelete(params.slug);
    } else {
      await Blog.findOneAndDelete({ slug: params.slug });
    }
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
