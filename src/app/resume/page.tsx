import { Metadata } from "next";
import { getExperience, getEducation } from "@/lib/data";
import ResumePageClient from "./ResumePageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional resume of Sayantan Kar - Full Stack Developer with experience in React, Node.js, and modern web technologies.",
  openGraph: {
    title: "Resume | Sayantan Kar",
    description: "Professional resume and work experience.",
  },
};

export default async function ResumePage() {
  const [experience, education] = await Promise.all([getExperience(), getEducation()]);
  return <ResumePageClient experience={experience} education={education} />;
}
