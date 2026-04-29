"use client";

import { m } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      title: "Frontend Web Developer",
      company: "PT DUIT INVESTECH",
      date: "Jan 2023 - Sekarang",
      description: "Membangun website untuk sistem manajemen data yang terintegrasi secara langsung",
      icon: <Briefcase className="w-5 h-5" />,
      type: "work"
    },
    {
      id: 2,
      title: "Fullstack Developer",
      company: "Self employed",
      date: "Agu 2022 - Sekarang",
      description: "Membangun permintaan web sistem kecil - menengah",
      icon: <Briefcase className="w-5 h-5" />,
      type: "work"
    },
  ];

  return (
    <section id="experience" className="py-32 px-6 max-w-5xl mx-auto relative overflow-hidden">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 text-white">Perjalanan Karir</h2>
        <p className="text-gray-400">Pengalaman kerja dan latar belakang pendidikan saya.</p>
      </m.div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 z-0"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <m.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Icon */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-primary text-primary flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  {exp.icon}
                </div>

                {/* Content Card */}
                <div className="w-full pl-12 md:pl-0 md:w-5/12">
                  <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl group ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`flex items-center gap-2 mb-3 text-xs md:text-sm text-secondary font-medium ${isEven ? 'md:justify-end' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      {exp.date}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.title}</h3>
                    <h4 className="text-gray-400 font-medium mb-4 text-sm">{exp.company}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
