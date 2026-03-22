import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo?: string;
  favicon?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBio: string;
  heroImage?: string;
  aboutText: string;
  aboutImage?: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  address?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  googleAnalytics?: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: "Portfolio" },
    siteDescription: { type: String, default: "Personal Developer Portfolio" },
    siteUrl: { type: String, default: "http://localhost:3000" },
    logo: { type: String },
    favicon: { type: String },
    heroTitle: { type: String, default: "Hi, I'm a Developer" },
    heroSubtitle: { type: String, default: "Full Stack Developer" },
    heroBio: { type: String, default: "I build amazing web applications" },
    heroImage: { type: String },
    aboutText: { type: String, default: "" },
    aboutImage: { type: String },
    resumeUrl: { type: String },
    email: { type: String, default: "hello@example.com" },
    phone: { type: String },
    address: { type: String },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
      website: { type: String },
    },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    googleAnalytics: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
