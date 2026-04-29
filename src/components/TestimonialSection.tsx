"use client";

import { useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Project Manager, Tech Corp",
    content: "Ginanjars adalah developer yang luar biasa. Ia selalu memperhatikan detail dan mampu mengirimkan kode berkualitas tinggi tepat waktu. Sangat merekomendasikan untuk bekerja dengannya!",
    avatar: "https://placehold.co/100x100/1e1e1e/3b82f6?text=BS"
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "UI/UX Designer",
    content: "Bekerja sama dengannya sangat menyenangkan. Ia memahami transisi desain dengan sangat baik dan mampu mewujudkan desain Figma yang rumit menjadi kenyataan dengan pixel-perfect.",
    avatar: "https://placehold.co/100x100/1e1e1e/8b5cf6?text=SA"
  },
  {
    id: 3,
    name: "Ahmad Rizki",
    role: "CEO, Startup Lokal",
    content: "Aplikasi web yang dibuat sangat cepat dan responsif. Pengalaman pengguna meningkat drastis setelah ia melakukan refactoring pada sistem kami.",
    avatar: "https://placehold.co/100x100/1e1e1e/ec4899?text=AR"
  }
];

function TestimonialCard({ testi }: { testi: typeof testimonials[number] }) {
  return (
    <div className="relative pt-10 group h-full">
      {/* Floating Avatar Badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-secondary/60 shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-300 ring-4 ring-[#050505]">
          <Image src={testi.avatar} alt={testi.name} fill className="object-cover" unoptimized />
        </div>
      </div>
      {/* Card Body */}
      <div className="p-6 pt-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-secondary/30 transition-all duration-300 shadow-lg text-center flex flex-col gap-3 relative h-full">
        <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 group-hover:text-secondary/15 transition-colors" />
        <div className="flex gap-1 justify-center text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed italic flex-1">"{testi.content}"</p>
        <div className="pt-3 border-t border-white/10">
          <p className="text-white font-semibold text-sm">{testi.name}</p>
          <p className="text-secondary text-xs mt-0.5">{testi.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const dragStartX = useRef(0);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(idx);
  };

  const prev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => goTo((activeIndex + 1) % testimonials.length, 1);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-20 px-6 max-w-6xl mx-auto overflow-hidden">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 text-white">Testimoni</h2>
      </m.div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {testimonials.map((testi, index) => (
          <m.div
            key={testi.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TestimonialCard testi={testi} />
          </m.div>
        ))}
      </div>

      {/* Mobile: Swipeable Carousel */}
      <div className="md:hidden">
        <div
          className="relative overflow-hidden"
          onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = dragStartX.current - e.changedTouches[0].clientX;
            if (diff > 50) next();
            else if (diff < -50) prev();
          }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <m.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.35 }}
              className="w-full"
            >
              <TestimonialCard testi={testimonials[activeIndex]} />
            </m.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx, idx > activeIndex ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-5 bg-secondary" : "w-1.5 bg-white/30"}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
