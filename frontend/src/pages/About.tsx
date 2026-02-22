import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Leaf,
  LineChart,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#052e16] pt-32 pb-24">
      
      {/* ===== BACKGROUND ELEMENTS ===== */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b] via-[#052e16] to-[#02140d]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ================= HERO SECTION (LEFT ALIGNED) ================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-4xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Globe size={14} />
            INNOVATE 2026 Submission
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Mewujudkan <span className="text-emerald-500">INNOVATE</span>
            <br />
            dengan OenKayeeAI.
          </h1>

          <p className="text-xl text-emerald-50/60 max-w-2xl mt-8 leading-relaxed">
            Kami menyatukan kecerdasan buatan dan kepedulian lingkungan untuk 
            menciptakan solusi deteksi penyakit tanaman yang instan, akurat, dan dapat diakses oleh siapa saja.
          </p>
        </motion.div>

        {/* ================= MISSION CARD (GRID) ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-32"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
          >
            <div className="p-10 lg:p-16 lg:w-3/5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
                  <Leaf className="text-emerald-600" size={32} />
                  Misi Kami
                </h2>
                <div className="h-1.5 w-20 bg-emerald-500 rounded-full" />
              </div>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  OenKayeeAI lahir dari titik temu antara <strong>teknologi mutakhir</strong> dan <strong>kebutuhan pangan global</strong>. 
                  Kami percaya bahwa petani tidak boleh berjuang sendiri melawan wabah penyakit tanaman yang seringkali terlambat dideteksi.
                </p>
                <p>
                  Melalui pemanfaatan <em>Deep Learning</em>, kami menekan penggunaan pestisida kimia yang berlebihan hingga 40%, 
                  sekaligus mengamankan hasil panen yang lebih sehat bagi konsumen.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 font-bold text-sm">
                  <CheckCircle2 size={18} /> Keberlanjutan
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 font-bold text-sm">
                  <CheckCircle2 size={18} /> Presisi Tinggi
                </div>
              </div>
            </div>

            <div className="lg:w-2/5 bg-gradient-to-br from-emerald-600 to-teal-700 p-12 lg:p-16 text-white flex flex-col justify-center items-start relative overflow-hidden">
               {/* Decorative background icon */}
               <Zap className="absolute right-[-20px] bottom-[-20px] w-64 h-64 opacity-10 rotate-12" />
               
               <div className="relative z-10">
                 <div className="text-7xl font-black mb-2 tracking-tighter">99%</div>
                 <div className="text-lg font-bold uppercase tracking-widest opacity-90 mb-4">Akurasi Validasi</div>
                 <p className="text-emerald-100/80 leading-relaxed">
                   Model MobileNetV2 kami telah dilatih pada puluhan ribu sampel citra daun dengan validasi data ilmiah yang ketat.
                 </p>
               </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= PILLARS (LEFT ALIGNED TITLES) ================= */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: <Zap className="text-amber-400" size={28} />,
              title: "Optimize",
              desc: "Arsitektur jaringan saraf yang ringan, memungkinkan deteksi dilakukan dalam hitungan detik bahkan pada perangkat dengan spesifikasi rendah.",
            },
            {
              icon: <ShieldCheck className="text-blue-400" size={28} />,
              title: "Validate",
              desc: "Diagnosis didasarkan pada dataset penyakit tanaman global yang tervalidasi oleh pakar agronomi dan ilmuwan data.",
            },
            {
              icon: <Cpu className="text-purple-400" size={28} />,
              title: "Advance",
              desc: "Mendorong transformasi digital di sektor agrikultur untuk mencapai efisiensi operasional dan ketahanan pangan jangka panjang.",
            },
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h4 className="text-white font-bold text-xl mb-4 tracking-tight">
                {pillar.title}
              </h4>
              <p className="text-emerald-100/50 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= ARCHITECTURE (DARK CARD) ================= */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 border border-white/5 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <LineChart className="text-emerald-400" size={28} />
                Arsitektur Sistem
              </h3>
              <p className="text-emerald-100/40 max-w-md">Integrasi teknologi modern untuk performa maksimal.</p>
            </div>
            <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
            {[
              {
                title: "Frontend Experience",
                items: ["React.js v18", "Framer Motion", "Tailwind CSS"],
              },
              {
                title: "Backend Core",
                items: ["Python Fast API", "Uvicorn Engine", "Pydantic Validation"],
              },
              {
                title: "AI & Neural Network",
                items: ["PyTorch Framework", "MobileNetV2 Architecture", "Tensor Processing"],
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-6">
                <div className="text-emerald-500 uppercase text-xs font-black tracking-[0.2em]">
                  {section.title}
                </div>
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;