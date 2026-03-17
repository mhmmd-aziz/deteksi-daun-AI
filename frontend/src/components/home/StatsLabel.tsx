import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Akurasi Deteksi", value: "98%" },
  { label: "Kecepatan Analisis", value: "< 2 dtk" }, // Diperpendek sedikit agar tidak pecah di mobile
  { label: "Jenis Tanaman", value: "3" },
  { label: "Petani Terbantu", value: "500+" },
];

export const StatsLabel: React.FC = () => {
  return (
    <div className="relative z-30 -mt-24 md:-mt-32 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-emerald-950/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        {/* Menggunakan Flex untuk kontrol posisi yang lebih presisi daripada Grid kasar */}
        <div className="flex flex-wrap lg:flex-nowrap justify-around items-center gap-8 lg:gap-0">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center w-[40%] lg:w-full ${
                index !== stats.length - 1 ? "lg:border-r lg:border-white/10" : ""
              }`}
            >
              <h3 className="text-3xl md:text-5xl font-black text-emerald-400 mb-2 leading-none tracking-tighter">
                {item.value}
              </h3>
              <p className="text-[10px] md:text-xs text-emerald-100/60 uppercase tracking-[0.15em] font-semibold leading-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};