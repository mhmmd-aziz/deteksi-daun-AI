import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Leaf,
  LineChart,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

function About() {
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
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

        {/* ================= HERO ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mb-28"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
          bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 
          text-xs font-bold uppercase tracking-widest mb-8">
            <Globe size={14} />
            Innovate 2026 Submission
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Transformasi Pertanian dengan
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              OenKayeeAI
            </span>
          </h1>

          <p className="text-xl text-emerald-100/60 mt-8 leading-relaxed">
            OenKayeeAI menghadirkan teknologi kecerdasan buatan untuk membantu
            petani mendeteksi penyakit tanaman secara cepat, akurat, dan mudah
            diakses — demi mendukung pertanian yang lebih efisien dan
            berkelanjutan.
          </p>
        </motion.div>

        {/* ================= MISSION ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-32"
        >
          <motion.div
            variants={fadeUp}
            className="bg-gradient-to-br from-white/[0.08] to-transparent 
            border border-white/10 backdrop-blur-md rounded-[2.5rem] 
            p-12 md:p-16 grid lg:grid-cols-2 gap-14"
          >
            <div>
              <h2 className="text-4xl font-bold text-white flex items-center gap-3 mb-6">
                <Leaf className="text-emerald-400" />
                Misi Kami
              </h2>

              <p className="text-emerald-100/60 leading-relaxed mb-6">
                OenKayeeAI dikembangkan untuk menjembatani kesenjangan antara
                teknologi kecerdasan buatan dan kebutuhan praktis petani di
                lapangan. Kami percaya bahwa inovasi digital dapat membantu
                meningkatkan ketahanan pangan global.
              </p>

              <p className="text-emerald-100/60 leading-relaxed mb-8">
                Dengan memanfaatkan model deep learning berbasis MobileNetV2,
                sistem kami mampu mengidentifikasi penyakit tanaman secara
                cepat dengan tingkat akurasi tinggi.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl text-emerald-400 text-sm font-bold">
                  <CheckCircle2 size={18} />
                  Sustainable Agriculture
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl text-emerald-400 text-sm font-bold">
                  <CheckCircle2 size={18} />
                  AI Powered
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-7xl font-black text-white mb-3">99%</div>
              <div className="text-emerald-400 font-bold uppercase tracking-widest mb-4">
                Model Accuracy
              </div>

              <p className="text-emerald-100/60 leading-relaxed">
                Model kami telah dilatih menggunakan ribuan dataset citra daun
                tanaman dan divalidasi dengan pendekatan ilmiah untuk
                memastikan tingkat akurasi yang optimal.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= PILLARS ================= */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {[
            {
              icon: <Zap className="text-amber-400" />,
              title: "Optimize",
              desc: "Arsitektur neural network yang ringan memungkinkan deteksi dilakukan secara cepat bahkan pada perangkat dengan spesifikasi rendah.",
            },
            {
              icon: <ShieldCheck className="text-blue-400" />,
              title: "Validate",
              desc: "Dataset penyakit tanaman yang digunakan telah diverifikasi oleh pakar agronomi dan ilmuwan data.",
            },
            {
              icon: <Cpu className="text-purple-400" />,
              title: "Advance",
              desc: "Mendorong digitalisasi sektor agrikultur untuk meningkatkan efisiensi produksi dan keberlanjutan pangan.",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.08] 
              to-transparent border border-white/10 backdrop-blur-md 
              hover:border-emerald-500/30 transition-all"
            >
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                {p.icon}
              </div>

              <h4 className="text-white text-xl font-bold mb-3">
                {p.title}
              </h4>

              <p className="text-emerald-100/60 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= ARCHITECTURE ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/[0.06] to-transparent 
          backdrop-blur-md border border-white/10 rounded-[2.5rem] 
          p-12 md:p-16"
        >
          <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <LineChart className="text-emerald-400" />
            System Architecture
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Frontend",
                items: ["React.js", "Framer Motion", "Tailwind CSS"],
              },
              {
                title: "Backend",
                items: ["FastAPI", "Python", "Pydantic"],
              },
              {
                title: "Artificial Intelligence",
                items: ["PyTorch", "MobileNetV2", "Tensor Processing"],
              },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-emerald-400 text-xs uppercase font-bold tracking-widest mb-6">
                  {s.title}
                </div>

                <ul className="space-y-4">
                  {s.items.map((it, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/80">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/>
                      {it}
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