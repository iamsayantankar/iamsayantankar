import { Metadata } from "next";
import { getSkills } from "@/lib/data";
import SkillsPageClient from "./SkillsPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skills & Expertise",
  description: "Technical skills and expertise in React, Next.js, Node.js, TypeScript, and modern web technologies.",
  openGraph: {
    title: "Skills & Expertise | Sayantan Kar",
    description: "Technical skills in modern web technologies.",
  },
};

export default async function SkillsPage() {
  const skills = await getSkills();
  return <SkillsPageClient skills={skills} />;
}
