// Features.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { Zap, ShieldCheck, Leaf } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  t: string;
  d: string;
}

const features: FeatureItem[] = [
  {
    icon: <Zap className="text-emerald-400" size={28} />,
    t: "Analisis Instan",
    d: "Diagnosis muncul dalam hitungan detik menggunakan MobileNetV2 yang telah dioptimalkan.",
  },
  {
    icon: <ShieldCheck className="text-teal-400" size={28} />,
    t: "Akurasi Tinggi",
    d: "Dilatih dengan ribuan dataset citra tanaman untuk memastikan presisi maksimal.",
  },
  {
    icon: <Leaf className="text-green-400" size={28} />,
    t: "Ramah Lingkungan",
    d: "Membantu petani mengurangi penggunaan pestisida berlebih demi keberlanjutan ekosistem.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const Features: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#052e16] py-28">
      
      {/* Background Subtle Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#052e16] via-[#064e3b] to-[#052e16]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Kenapa Memilih <span className="text-emerald-400">LeafAI</span>?
          </h2>
          <p className="text-emerald-100/60 mt-6 max-w-2xl mx-auto">
            Solusi berbasis AI yang dirancang untuk efisiensi, akurasi, dan keberlanjutan pertanian modern.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.25)]"
            >
              <div className="mb-6">{f.icon}</div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {f.t}
              </h3>

              <p className="text-emerald-100/70 leading-relaxed">
                {f.d}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};