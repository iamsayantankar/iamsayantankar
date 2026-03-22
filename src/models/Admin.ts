import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
