import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  company: string;
  position: string;
  feedback: string;
  photo?: string;
  rating: number;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    feedback: { type: String, required: true },
    photo: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
