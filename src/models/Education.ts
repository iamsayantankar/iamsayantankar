import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  year: string;
  startYear: string;
  endYear?: string;
  description?: string;
  grade?: string;
  order: number;
  createdAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    year: { type: String, required: true },
    startYear: { type: String, required: true },
    endYear: { type: String },
    description: { type: String },
    grade: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
