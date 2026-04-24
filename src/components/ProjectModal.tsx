"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Briefcase } from "lucide-react";

interface Project {
  title: string;
  role: string;
  description: string;
  techStack: string[];
  link?: string;
  active?: boolean;
}

export default function ProjectModal({ project, onClose }: { project: Project | null, onClose: () => void }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          <h3 className="text-3xl font-bold font-outfit mb-2 text-white">{project.title}</h3>

          <div className="flex items-center gap-2 mb-6 text-primary font-medium">
            <Briefcase size={18} />
            <span>{project.role}</span>
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
