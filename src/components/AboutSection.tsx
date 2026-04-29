"use client";

import { motion, m } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-36 px-6 max-w-4xl mx-auto">
      <m.div
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
      </m.div>
    </section>
  );
}
