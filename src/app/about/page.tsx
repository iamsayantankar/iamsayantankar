import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Sayantan Kar - Full Stack Developer & Creative Technologist passionate about building scalable web applications.",
  openGraph: {
    title: "About | Sayantan Kar",
    description: "Full Stack Developer & Creative Technologist.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
