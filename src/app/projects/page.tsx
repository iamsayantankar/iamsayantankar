import { Metadata } from "next";
import { getProjects } from "@/lib/data";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of web development projects including full-stack applications, APIs, and more.",
  openGraph: {
    title: "Projects | Sayantan Kar",
    description: "Explore my portfolio of web development projects.",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects(50);
  return <ProjectsPageClient projects={projects} />;
}
