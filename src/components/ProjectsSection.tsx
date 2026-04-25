"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProjectsSection({ setSelectedProject }: { setSelectedProject: (val: any) => void }) {
  const projects = [
    {
      title: "HANUDNAS & KODIKLATAL",
      role: "Frontend Web Developer",
      description: "Membangun website untuk sistem manajemen data yang terintegrasi secara langsung dengan fitur video conference menggunakan Jitsi.",
      active: true,
      techStack: ["Vue 2", "Nuxt 2", "Jitsi"],
      key: "hanudnas",
    },
    {
      title: "SMARTFARMING",
      role: "Frontend Web Developer",
      description: "Pengembangan website khusus untuk dasbor admin (admin side) guna memfasilitasi pemantauan dan manajemen data secara real-time.",
      active: true,
      techStack: ["Next.js", "Ant Design", "Tailwind CSS"],
      key: "smartfarming",
    },
    {
      title: "NAGITEC",
      role: "Frontend Web Developer",
      description: "Membangun website untuk manajemen data terpadu dan sistem penyewaan internal (internal rent system) perusahaan.",
      active: true,
      techStack: ["Next.js", "Ant Design", "Tailwind CSS"],
      key: "nagitec",
    },
    {
      title: "PERJADIN | BANK TANAH",
      role: "Frontend Web Developer",
      description: "Membangun website admin manajemen perjalanan dinas dan surat menyurat lembaga bank tanah.",
      active: true,
      techStack: ["Next.js", "Ant Design", "Tailwind CSS"],
      key: "perjadin",
    },
    {
      title: "C-Art (Web Application)",
      role: "Fullstack / Frontend Developer",
      description: "Mengembangkan marketplace untuk jual beli item seni digital yang dilengkapi dengan fitur networking real-time.",
      active: false,
      techStack: ["ReactJS", "NodeJS", "PostgreSQL", "Socket.io", "AWS EC2", "Firebase"],
      link: "https://github.com/orgs/C-Art-team/repositories",
      key: "cart",
    },
    {
      title: "Rent-me App (Web Application)",
      role: "Fullstack / Frontend Developer",
      description: "Merancang dan membangun aplikasi kencan (dating app) interaktif dengan fitur real-time chat yang responsif.",
      active: false,
      techStack: ["Vue.js", "NodeJS", "PostgreSQL", "Railway", "Supabase", "Firebase"],
      link: "https://github.com/kibuelll/p2-iproject-rent-me",
      key: "rentme",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Portofolio</h2>
        <p className="text-gray-400">Proyek profesional dan personal yang pernah saya kerjakan.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedProject(project)}
            className="glass-card p-6 flex flex-col h-full group hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="text-primary" size={20} />
            </div>

            <h3 className="text-2xl font-bold font-outfit mb-2 group-hover:text-secondary transition-colors">{project.title}</h3>
            <p className="text-sm text-primary mb-4">{project.role}</p>

            <p className="text-gray-400 mb-6 flex-grow line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
              {project.techStack.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded-md text-gray-300">
                  {tag}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-gray-400">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
