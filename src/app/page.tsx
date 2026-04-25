"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThreeBackground from "@/components/ThreeBackground";
import ContactForm from "@/components/ContactForm";
import ProjectModal from "@/components/ProjectModal";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";
import GitLabCalendar from "@/components/GitlabActivity";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      title: "HANUDNAS & KODIKLATAL",
      role: "Frontend Web Developer",
      description: "Membangun website untuk sistem manajemen data yang terintegrasi secara langsung dengan fitur video conference menggunakan Jitsi.",
      active: true,
      techStack: ["Vue 2", "Nuxt 2", "Jitsi"],
    },
    {
      title: "SMARTFARMING",
      role: "Frontend Web Developer",
      description: "Pengembangan website khusus untuk dasbor admin (admin side) guna memfasilitasi pemantauan dan manajemen data secara real-time.",
      active: true,
      techStack: ["Next.js", "Ant Design", "Tailwind CSS"],
    },
    {
      title: "NAGITEC",
      role: "Frontend Web Developer",
      description: "Membangun website untuk manajemen data terpadu dan sistem penyewaan internal (internal rent system) perusahaan.",
      active: true,
      techStack: ["Next.js", "Ant Design", "Tailwind CSS"],
    },
    {
      title: "PERJADIN | BANK TANAH",
      role: "Frontend Web Developer",
      description: "Membangun website admin manajemen perjalanan dinas dan surat menyurat lembaga bank tanah.",
      active: true,
      techStack: ["Next.js", "Ant Design", "Tailwind CSS"],
    },
    {
      title: "C-Art (Web Application)",
      role: "Fullstack / Frontend Developer",
      description: "Mengembangkan marketplace untuk jual beli item seni digital yang dilengkapi dengan fitur networking real-time.",
      active: false,
      techStack: ["ReactJS", "NodeJS", "PostgreSQL", "Socket.io", "AWS EC2", "Firebase"],
      link: "https://github.com/orgs/C-Art-team/repositories",
    },
    {
      title: "Rent-me App (Web Application)",
      role: "Fullstack / Frontend Developer",
      description: "Merancang dan membangun aplikasi kencan (dating app) interaktif dengan fitur real-time chat yang responsif.",
      active: false,
      techStack: ["Vue.js", "NodeJS", "PostgreSQL", "Railway", "Supabase", "Firebase"],
      link: "https://github.com/kibuelll/p2-iproject-rent-me",
    },
  ];

  const techStack = [
    "Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS", "Node.js",
    "Framer Motion", "Three.js", "PostgreSQL", "Firebase"
  ];

  return (
    <main className="min-h-screen selection:bg-primary selection:text-white relative">
      <ThreeBackground />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter mb-4 flex flex-col items-center"
        >
          Ginanjar Saiful Ihsan <br />
          <span className="text-gradient">Frontend Developer</span>
        </motion.h1>

        {/* Custom Social Icons Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center w-full max-w-2xl mb-8"
        >
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <a href="#linkedin" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm" aria-label="LinkedIn">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="#x" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-black hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm" aria-label="X (Twitter)">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#instagram" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm" aria-label="Instagram">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="#github" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2b3137] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm" aria-label="GitHub">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10"
        >
          Membangun antarmuka modern yang imersif dengan performa tinggi.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#about" className="px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            Mulai Jelajah
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl"
        >
          {/* Visual Accents */}
          <div className="absolute -top-16 -left-8 md:-left-16 text-9xl text-white/5 font-outfit font-bold select-none pointer-events-none">
            "
          </div>

          <div className="space-y-8 relative z-10">
            <p className="text-2xl md:text-4xl font-outfit font-light leading-snug text-gray-200">
              Menyatukan <span className="font-bold text-gradient">logika pemrograman</span> dengan kreativitas digital untuk membangun antarmuka web yang luar biasa.
            </p>

            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>

            <div className="grid md:grid-cols-2 gap-8 text-gray-400 text-lg leading-relaxed">
              <div>
                Ketertarikan saya dalam memecahkan masalah logika membawa saya terjun ke dunia rekayasa perangkat lunak, yang semakin terasah setelah menyelesaikan program intensif di <span className="text-white font-medium">Bootcamp Hacktiv8</span> (Fullstack JavaScript).
              </div>
              <div>
                Kini, fokus utama saya adalah merancang <span className="text-white font-medium">sistem manajemen data yang kompleks</span> dan efisien. Saya selalu bersemangat mengeksplorasi tech-stack modern demi menciptakan pengalaman <span className="text-gradient font-semibold">UI/UX yang seamless</span> dan responsif.
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Tech Arsenal</h2>
          <p className="text-gray-400">Peralatan modern yang saya gunakan sehari-hari.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card px-6 py-3 text-sm font-medium hover:-translate-y-1 hover:shadow-sm hover:shadow-secondary  hover:border-secondary/50 transition-all cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
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

      {/* <GitHubCalendar username="kibuelll" /> */}
      <section id="gitlab" className="py-20 px-6 max-w-3xl mx-auto pb-32">
        <GitLabCalendar />
      </section>

      {/* <img src="https://github-readme-stats.vercel.app/api?username=kibuelll&show_icons=true&theme=radical" alt="GitHub Stats" /> */}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Mari Berkolaborasi</h2>
          <p className="text-gray-400">Punya proyek menarik atau peluang kerja? Kirim pesan ke saya.</p>
        </motion.div>

        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 flex flex-col items-center gap-6">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
