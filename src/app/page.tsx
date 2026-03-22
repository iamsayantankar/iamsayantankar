import { getBlogs, getProjects, getServices, getSkills, getTestimonials, getExperience, getEducation } from "@/lib/data";
import HeroSection from "@/components/sections/HeroSection";
import SkillsOverview from "@/components/sections/SkillsOverview";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ResumeSection from "@/components/sections/ResumeSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DetailedSkills from "@/components/sections/DetailedSkills";
import BlogPreview from "@/components/sections/BlogPreview";
import ContactSection from "@/components/sections/ContactSection";

export default async function Home() {
  const [blogs, projects, services, skills, testimonials, experience, education] = await Promise.all([
    getBlogs(3),
    getProjects(50),
    getServices(),
    getSkills(),
    getTestimonials(),
    getExperience(),
    getEducation(),
  ]);

  return (
    <main>
      <HeroSection />
      <SkillsOverview skills={skills.slice(0, 12)} />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      <ExperienceSection data={experience} />
      <EducationSection data={education} />
      <ResumeSection />
      <TestimonialsSection data={testimonials} />
      <DetailedSkills skills={skills} />
      <BlogPreview blogs={blogs} />
      <ContactSection />
    </main>
  );
}
