import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  tags: string[];
  category: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  status: "published" | "draft";
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    tags: [{ type: String }],
    category: { type: String, required: true },
    featuredImage: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["published", "draft"], default: "published" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
