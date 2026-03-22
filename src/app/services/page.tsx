import { Metadata } from "next";
import { getServices } from "@/lib/data";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional web development services including full-stack development, UI/UX design, mobile apps, and cloud solutions.",
  openGraph: {
    title: "Services | Sayantan Kar",
    description: "Professional web development services.",
  },
};

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesPageClient services={services} />;
}
