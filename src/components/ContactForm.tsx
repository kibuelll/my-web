"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit} 
      className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-6 md:p-8 rounded-3xl flex flex-col gap-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
            <User size={18} />
          </div>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            placeholder="Nama Anda"
          />
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
            <Mail size={18} />
          </div>
          <input 
            type="email" 
            name="email" 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            placeholder="Alamat Email"
          />
        </div>
      </div>
      
      <div className="relative group flex-grow">
        <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
          <MessageSquare size={18} />
        </div>
        <textarea 
          name="message" 
          required 
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none"
          placeholder="Tulis pesan Anda di sini..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full sm:w-auto self-end px-8 py-3.5 bg-white text-black font-semibold rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
        ) : (
          <>
            Kirim Pesan 
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>

      {status === "success" && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm flex items-center gap-2 mt-2">
          <CheckCircle2 size={16} /> Pesan berhasil terkirim!
        </motion.p>
      )}
      {status === "error" && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm flex items-center gap-2 mt-2">
          <AlertCircle size={16} /> Gagal mengirim pesan. Silakan coba lagi.
        </motion.p>
      )}
    </motion.form>
  );
}
