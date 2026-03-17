import React from "react";
import { motion, Variants } from "framer-motion";
import { Zap, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import maskotImg from "../../assets/maskotbertanya.png";

interface FeatureItem {
  icon: React.ReactNode;
  t: string;
  d: string;
  color: string;
}

const features: FeatureItem[] = [
  {
    icon: <Zap size={26} />,
    t: "Analisis Instan",
    d: "Diagnosis muncul dalam hitungan detik menggunakan arsitektur MobileNetV2 yang telah dikompresi untuk kecepatan maksimal.",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    icon: <ShieldCheck size={26} />,
    t: "Akurasi Tinggi",
    d: "Model AI telah divalidasi dengan ribuan dataset citra pertanian untuk meminimalisir kesalahan diagnosis lapangan.",
    color: "from-teal-400 to-emerald-500",
  },
  {
    icon: <Leaf size={26} />,
    t: "Ramah Lingkungan",
    d: "Mendukung pertanian berkelanjutan dengan membatasi penggunaan pestisida hanya pada area yang benar-benar terinfeksi.",
    color: "from-green-400 to-emerald-600",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const Features: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#022c22] py-32">
      {/* --- Advanced Background Layer --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-50" />
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Core Technology
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Kenapa memilih <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              OenKayeeAI?
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          {/* Left: Interactive Mascot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[45%] sticky top-32"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full group-hover:bg-emerald-500/30 transition-colors duration-700" />
              <motion.img 
                src={maskotImg} 
                alt="Mascot" 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] cursor-pointer"
              />
            </div>
          </motion.div>

          {/* Right: Premium Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-[55%] space-y-8"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/[0.05] backdrop-blur-md hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Icon Container with Gradient Border */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} p-[1px] shadow-lg group-hover:rotate-6 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-2xl bg-[#022c22] flex items-center justify-center text-white">
                      {f.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {f.t}
                      </h3>
                      <span className="text-white/5 font-black text-5xl absolute right-8 top-8 group-hover:text-emerald-500/10 transition-colors">
                        0{i + 1}
                      </span>
                    </div>
                    <p className="text-emerald-100/60 leading-relaxed mb-4 text-lg">
                      {f.d}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                      Learn detail <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};