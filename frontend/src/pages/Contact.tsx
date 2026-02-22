import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react"; // Tambahkan import React di sini
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Github,
  Linkedin,
  CheckCircle2,
  User,
  AtSign,
} from "lucide-react";

function Contact() {
  const [sent, setSent] = useState(false);

  // FIX 1: Tambahkan tipe data React.FormEvent pada parameter 'e'
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#052e16] pt-32 pb-24">
      
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b] via-[#052e16] to-[#031b12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.12),transparent_40%)]" />
      </div>

      {/* ===== CONTAINER ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* ================= LEFT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
                Mari <span className="text-emerald-400">Berkolaborasi</span>
              </h1>

              <p className="mt-6 text-lg text-emerald-50/70 max-w-xl leading-relaxed">
                Punya ide untuk pengembangan OenKayeeAI atau ingin mendiskusikan
                implementasi teknologi lingkungan? Tim kami siap mendengar Anda.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-emerald-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase text-emerald-300/60 tracking-widest">
                    Email Resmi
                  </p>
                  <p className="text-white font-semibold text-lg">
                    contact@OenKayeeAI.tech
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-emerald-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase text-emerald-300/60 tracking-widest">
                    Lokasi
                  </p>
                  <p className="text-white font-semibold text-lg">
                    Sumatera Utara, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-emerald-200/60 mb-4 text-sm">
                Ikuti Kami
              </p>
              <div className="flex gap-4">
                {[<Github size={18} key="github" />, <Linkedin size={18} key="linkedin" />].map(
                  (icon, i) => (
                    <button
                      key={i}
                      className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300"
                    >
                      {icon}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE FORM ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] border border-white/40"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <User size={15} className="text-emerald-500" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <AtSign size={15} className="text-emerald-500" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <MessageSquare size={15} className="text-emerald-500" />
                  Pesan
                </label>
                <textarea
                  rows={4} // FIX 2: Ubah dari string "4" menjadi number {4}
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none resize-none transition-all"
                  placeholder="Tulis pesan atau pertanyaan Anda..."
                />
              </div>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.button
                    key="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/40 transition-all duration-300"
                  >
                    <Send size={18} />
                    Kirim Pesan
                  </motion.button>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    Terima kasih! Pesan Terkirim
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;