import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sayantan Kar for web development projects, collaborations, or freelance work.",
  openGraph: {
    title: "Contact | Sayantan Kar",
    description: "Get in touch for web development projects and collaborations.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
