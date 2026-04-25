"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  role: string;
  description: string;
  techStack: string[];
  link?: string;
  active?: boolean;
  key?: string; // used to identify local assets in public/projects/
}

export default function ProjectModal({ project, onClose }: { project: Project | null, onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when opening a new project
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  if (!project) return null;

  // We assume there are 3 screenshots per project (e.g. key-1.jpg, key-2.jpg, key-3.jpg)
  const images = project.key
    ? [1, 2, 3].map(i => `/projects/${project.key}-${i}.webp`)
    : [1, 2, 3].map(i => `https://placehold.co/800x500/111/fff?text=Project+Mockup+${i}`);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white z-10"
            >
              <X size={20} />
            </button>

            <h3 className="text-3xl font-bold font-outfit mb-2 text-white pr-10">{project.title}</h3>

            <div className="flex items-center gap-2 mb-6 text-primary font-medium">
              <Briefcase size={18} />
              <span>{project.role}</span>
            </div>

            {/* Fancy Carousel Section */}
            <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden group bg-black/40 border border-white/5 shadow-inner flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  onError={(e) => {
                    // If local image fails to load, fallback to a cool placeholder
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x500/1a1a1a/4ade80?text=${project.key || 'Preview'}+${currentImageIndex + 1}`;
                  }}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain"
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                />
              </AnimatePresence>

              {/* Carousel Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <button onClick={prevImage} className="pointer-events-auto p-2 bg-black/60 hover:bg-black border border-white/10 text-white rounded-full backdrop-blur-md transition-all hover:scale-110">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImage} className="pointer-events-auto p-2 bg-black/60 hover:bg-black border border-white/10 text-white rounded-full backdrop-blur-md transition-all hover:scale-110">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-5 bg-primary' : 'w-1.5 bg-white/50 hover:bg-white'}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold font-outfit text-gray-400 uppercase tracking-wider mb-2">Deskripsi & Fitur Utama</h4>
                <p className="text-gray-200 leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold font-outfit text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Code size={16} /> Tech Stack & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tag => (
                    <span key={tag} className="text-sm px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {(project.link || project.active === false) && (
                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-medium transition-colors border border-primary/20"
                    >
                      <Code size={18} />
                      Lihat Repositori
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <div></div>
                  )}

                  {project.active === false && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      DEPRECATED
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
