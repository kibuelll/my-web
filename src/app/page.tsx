"use client";

import { useState } from "react";
import ThreeBackground from "@/components/ThreeBackground";
import ProjectModal from "@/components/ProjectModal";
import GitLabCalendar from "@/components/GitlabActivity";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <main className="min-h-screen selection:bg-primary selection:text-white relative">
      <ThreeBackground />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <HeroSection />

      <AboutSection />

      <TechStackSection />

      <ProjectsSection setSelectedProject={setSelectedProject} />

      <section id="gitlab" className="py-20 px-6 max-w-3xl mx-auto pb-32">
        <GitLabCalendar />
      </section>

      <ContactSection />

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 flex flex-col items-center gap-6">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
