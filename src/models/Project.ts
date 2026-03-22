import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content?: string;
  technologies: string[];
  images: string[];
  thumbnail?: string;
  githubLink?: string;
  liveLink?: string;
  category: string;
  featured: boolean;
  order: number;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String },
    technologies: [{ type: String }],
    images: [{ type: String }],
    thumbnail: { type: String },
    githubLink: { type: String },
    liveLink: { type: String },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["published", "draft"], default: "published" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
