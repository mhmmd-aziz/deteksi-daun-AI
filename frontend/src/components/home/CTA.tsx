import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import gambar sesuai instruksi kamu
import kebunBg from "../../assets/kebun.jpg";

export const CTA: React.FC = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Container Utama - max-w-7xl agar setara dengan Navbar */}
      <div className="relative z-10 max-w-[1170px] mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="group relative w-full overflow-hidden rounded-[2.5rem] bg-[#1a2e23]/50 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* BAGIAN KIRI: GAMBAR */}
            <div className="relative w-full lg:w-1/2 min-h-[400px]">
              <img 
                src={kebunBg} // Menggunakan variabel import kebunBg
                alt="Kebun Digital" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay agar gambar tidak terlalu terang dan menyatu dengan tema dark green */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#11241a]/20" />
            </div>

            {/* BAGIAN KANAN: KONTEN TEKS */}
            <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-emerald-950/30">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Siap Menyelamatkan <br />
                <span className="text-emerald-400">Hasil Panen Anda?</span>
              </h2>

              <p className="text-emerald-50/70 text-lg mb-10 max-w-lg leading-relaxed">
                Mulai gunakan AI untuk masa depan pertanian yang lebih cerdas 
                dan berkelanjutan. Deteksi penyakit tanaman hanya dalam hitungan detik.
              </p>

              <div className="flex">
                <Link to="/detect">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-3"
                  >
                    Coba Deteksi Sekarang
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Glow Effect di latar belakang agar tidak terlalu sepi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
    </section>
  );
};