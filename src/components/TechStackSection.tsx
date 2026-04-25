"use client";

import { motion } from "framer-motion";

export default function TechStackSection() {
  const techStack = [
    "Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS", "Node.js",
    "Framer Motion", "Three.js", "PostgreSQL", "Firebase"
  ];

  return (
    <section id="stack" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Tech Stack</h2>
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
  );
}
