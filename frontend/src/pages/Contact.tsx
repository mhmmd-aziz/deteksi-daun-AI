import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#022c22] py-32">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
        bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
        from-emerald-900/20 via-transparent to-transparent opacity-50"/>

        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] 
        bg-emerald-500/10 blur-[120px] rounded-full"/>

        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] 
        bg-teal-500/10 blur-[120px] rounded-full"/>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"/>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-2 gap-24 items-start">

          {/* ================= LEFT SIDE ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-emerald-500/10 border border-emerald-500/20 text-emerald-400
              text-xs font-bold uppercase tracking-widest mb-6">
                Contact OenKayeeAI
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                Mari
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  {" "}Berkolaborasi
                </span>
              </h1>

              <p className="mt-6 text-lg text-emerald-100/60 max-w-xl leading-relaxed">
                Punya ide untuk pengembangan OenKayeeAI atau ingin berdiskusi
                mengenai implementasi teknologi AI untuk pertanian?
                Tim kami siap mendengar dan berkolaborasi dengan Anda.
              </p>

            </div>

            {/* CONTACT INFO */}

            <div className="space-y-8">

              <div className="flex items-start gap-4">
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 text-emerald-400">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-xs uppercase text-emerald-300/60 tracking-widest">
                    Email
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
                    Indonesia, Aceh
                  </p>
                </div>
              </div>

            </div>

            {/* SOCIAL */}

            <div className="pt-10 border-t border-white/10">

              <p className="text-emerald-200/60 mb-4 text-sm">
                Ikuti Kami
              </p>

              <div className="flex gap-4">

                <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300">
                  <Github size={18} />
                </button>

                <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300">
                  <Linkedin size={18} />
                </button>

              </div>

            </div>
          </motion.div>

          {/* ================= RIGHT SIDE FORM ================= */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-10 
            shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] border border-white/40"
          >

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <User size={15} className="text-emerald-500"/>
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200
                  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                  outline-none transition-all"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <AtSign size={15} className="text-emerald-500"/>
                  Email
                </label>

                <input
                  type="email"
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200
                  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                  outline-none transition-all"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <MessageSquare size={15} className="text-emerald-500"/>
                  Pesan
                </label>

                <textarea
                  rows={4}
                  required
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200
                  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10
                  outline-none resize-none transition-all"
                  placeholder="Tulis pesan Anda..."
                />
              </div>

              <AnimatePresence mode="wait">

                {!sent ? (

                  <motion.button
                    key="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500
                    text-white py-4 rounded-xl font-bold flex items-center
                    justify-center gap-2 shadow-lg hover:shadow-emerald-500/40
                    transition-all duration-300"
                  >
                    <Send size={18}/>
                    Kirim Pesan
                  </motion.button>

                ) : (

                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full bg-emerald-500 text-white py-4
                    rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18}/>
                    Pesan Berhasil Terkirim
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