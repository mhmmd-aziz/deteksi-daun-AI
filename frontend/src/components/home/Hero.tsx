import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react" 

// FIX: Tambahkan baris ini biar TypeScript gak rewel soal gambar
// @ts-expect-error - Abaikan error TS untuk import gambar
import kebunBg from "../../assets/kebun.jpg"

interface HeroProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const carouselData = [
  {
    badge: "Next-Gen Agrotech",
    titlePart1: "Selamatkan Panen Anda dari",
    titlePart2: "Penyakit Daun",
    desc: "Optimalkan hasil panen paprika, kentang, dan tomat dengan deteksi penyakit daun berbasis AI Vision secara real-time untuk meningkatkan produktivitas."
  },
  {
    badge: "Paprika Leaf Defense",
    titlePart1: "Cegah Kerusakan akibat",
    titlePart2: "Bacterial Spot",
    desc: "Lindungi paprika Anda dari ancaman bercak bakteri (Bacterial Spot). Identifikasi lebih awal sebelum menyebar ke seluruh perkebunan Anda."
  },
  {
    badge: "Tomato AI Guard",
    titlePart1: "Atasi Ancaman Jamur pada",
    titlePart2: "Daun Tomat",
    desc: "Jangan biarkan hawar daun menghancurkan panen tomat Anda. Deteksi dini gejala Early Blight dan Late Blight dengan presisi tinggi."
  },
  {
    badge: "Potato Health Monitor",
    titlePart1: "Deteksi Hawar Daun pada",
    titlePart2: "Tanaman Kentang",
    desc: "Pastikan umbi kentang tumbuh maksimal dengan menjaga kesehatan daunnya. Deteksi hawar dan bercak secara otomatis dan akurat."
  }
]

export default function Hero({ activeIndex, setActiveIndex }: HeroProps) {
  const currentData = carouselData[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselData.length);
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  }

  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#041a11] overflow-hidden pointer-events-none">
      
      <div className="absolute inset-0 z-0">
        <img
          src={kebunBg}
          alt="Latar Kebun"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041a11] via-[#041a11]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#041a11] via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24 pointer-events-auto">
        
        <div className="max-w-3xl min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
                  {currentData.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
                {currentData.titlePart1}{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {currentData.titlePart2}
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                {currentData.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link to="/detect">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 transition-all text-white font-semibold rounded-xl shadow-lg"
              >
                Mulai Analisis →
              </motion.button>
            </Link>

            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrev}
                className="p-3 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-green-400 transition-all rounded-full text-white backdrop-blur-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="p-3 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-green-400 transition-all rounded-full text-white backdrop-blur-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <div>
                <div className="text-white font-bold text-lg text-right">0{activeIndex + 1} / 04</div>
                <div className="text-white/60 text-sm">Model View</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}