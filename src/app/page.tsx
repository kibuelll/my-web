"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ProjectModal from "@/components/ProjectModal";
import ChatBot from "@/components/ChatBot";

// Lazy load heavy components — only loaded when needed
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });
const GitLabCalendar = dynamic(() => import("@/components/GitlabActivity"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center text-gray-500">Memuat data aktivitas...</div>
});

import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable Three.js WebGL background on desktop (>= 768px)
    // Mobile GPUs struggle with WebGL and it's the main thread blocker
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  return (
    <main className="min-h-screen selection:bg-primary selection:text-white relative">
      <Navbar />
      {/* Render 3D background only on desktop to save mobile main thread */}
      {isDesktop && <ThreeBackground />}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <HeroSection />

      <AboutSection />

      <ExperienceSection />

      <TechStackSection />

      <ProjectsSection setSelectedProject={setSelectedProject} />

      <section id="gitlab" className="py-20 px-6 max-w-3xl mx-auto pb-32">
        <GitLabCalendar />
      </section>

      <TestimonialSection />

      <ContactSection />

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 flex flex-col items-center gap-6">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>

      {/* Floating AI Chatbot */}
      <ChatBot />
    </main>
  );
}
