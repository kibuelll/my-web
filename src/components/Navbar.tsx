"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, User, Briefcase, Code, MessageSquare, Layout } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Tentang", href: "/#about", icon: User },
  { name: "Pengalaman", href: "/#experience", icon: Briefcase },
  { name: "Proyek", href: "/#projects", icon: Code },
  { name: "Playground", href: "/playground", icon: Layout },
  // { name: "Kontak", href: "/#contact", icon: MessageSquare },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "py-4" : "py-8"
      }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${isScrolled
          ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent border border-transparent"
          }`}>
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
              <Cpu size={20} />
            </div>
            <span className="font-bold text-xl tracking-tighter text-white hidden sm:block">GIN<span className="text-primary">WEB</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <a
              href="/#contact"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-6 py-4 md:hidden"
          >
            <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {navLinks.map((link, i) => (
                <m.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-white border-b border-white/5 last:border-0 transition-colors"
                >
                  <link.icon size={18} className="text-primary" />
                  <span className="font-medium">{link.name}</span>
                </m.a>
              ))}
              <div className="p-6">
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
