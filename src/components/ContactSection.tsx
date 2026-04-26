"use client";

import { m } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 max-w-3xl mx-auto pb-32">
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Mari Berkolaborasi</h2>
        <p className="text-gray-400">Punya proyek menarik atau peluang kerja? Kirim pesan ke saya.</p>
      </m.div>

      <ContactForm />
    </section>
  );
}
