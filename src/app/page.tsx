"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThreeBackground from "@/components/ThreeBackground";
import ContactForm from "@/components/ContactForm";
import ProjectModal from "@/components/ProjectModal";
import { ArrowRight } from "lucide-react";

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
      description: "Membangun website admin manjaemen perjalann dinas dan surat menyurat lembaga bank tanah.",
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
          className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter mb-6"
        >
          Ginanjar Saiful Ihsan <br /> <span className="text-gradient">Frontend Developer</span>
        </motion.h1>
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
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10">
        <p>© {new Date().getFullYear()} Frontend Developer Portfolio. Built with Next.js & Three.js.</p>
      </footer>
    </main>
  );
}
