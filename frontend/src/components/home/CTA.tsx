import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import kebunBg from "../../assets/kebun.jpg";

export const CTA: React.FC = () => {
  return (
    // Section harus w-full agar background tetap penuh, container di dalamnya yang membatasi lebar
    <section className="relative w-full py-24 bg-[#022c22]">
      <div className="max-w-[1270px] mx-auto px-6 md:px-10">
        
        {/* Card Utama - Menggunakan mx-auto agar pas di tengah */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative group overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl"
        >
          {/* Background Image dengan Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={kebunBg} 
              alt="Background" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Gradient Overlay: Diperluas agar teks lebih mudah dibaca di layar lebar */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#022c22] via-[#022c22]/90 to-transparent" />
          </div>

          {/* Content Layer: Menggunakan Padding yang lebih lega (md:p-24) */}
          <div className="relative z-10 p-10 md:p-24 flex flex-col items-start max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Ukuran Font disesuaikan agar lebih 'bold' di layar besar */}
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                Mulai Masa Depan <br />
                <span className="text-emerald-400">Pertanian Anda.</span>
              </h2>
              
              <p className="text-emerald-50/60 text-lg md:text-xl mb-12 leading-relaxed max-w-xl">
                Optimalkan hasil panen dengan teknologi AI presisi. 
                Cepat, akurat, dan berkelanjutan untuk ekosistem yang lebih baik.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link to="/detect">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-emerald-500/20 text-lg"
                  >
                    Coba Deteksi Sekarang
                    <ArrowRight size={24} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Accent Decor: Diperbesar ukurannya untuk layar lebar */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        </motion.div>

      </div>
    </section>
  );
};