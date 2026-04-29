"use client";

import Navbar from "@/components/Navbar";
import PlaygroundSection from "@/components/PlaygroundSection";
import { m } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-white relative bg-[#050505]">
      <ThreeBackground />
      <Navbar />

      <div className="pt-32 pb-4 px-6 max-w-4xl mx-auto">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </m.div>

        <PlaygroundSection />

        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm italic">
            "Coding is a lot like a game. You have to figure out the rules, and then you have to figure out how to win."
          </p>
        </div>
      </div>

      <footer className="py-12 border-t border-white/10 flex flex-col items-center gap-6 mt-20">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Ginanjar Saiful Ihsan. All rights reserved.</p>
      </footer>
    </main>
  );
}
