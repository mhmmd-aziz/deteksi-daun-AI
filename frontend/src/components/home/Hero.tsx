    import React from "react"
    import { motion } from "framer-motion"
    import { Link } from "react-router-dom"
    import kebunBg from "../../assets/kebun.jpg"

    export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center bg-[#041a11] overflow-hidden">
        
        {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0 z-0">
            <img
            src={kebunBg}
            alt="Latar Kebun"
            className="w-full h-full object-cover opacity-60"
            />

            {/* Soft overlay gradient (professional look) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#041a11] via-[#041a11]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#041a11] via-transparent to-black/30"></div>
        </div>

        {/* ================= CONTENT CONTAINER (Same width as Navbar) ================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24">
            
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
            >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
                Next-Gen Agrotech
                </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
                Selamatkan Panen Anda dari{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Penyakit Daun
                </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                Optimalkan hasil tani dengan deteksi penyakit tanaman berbasis{" "}
                <span className="text-green-400 font-semibold">AI Vision</span>{" "}
                secara real-time untuk meningkatkan produktivitas dan mengurangi risiko gagal panen.
            </p>

            {/* CTA Section */}
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

                {/* Stats */}
                <div className="flex items-center gap-4">
                {/* <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                    <img
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#041a11]"
                        src={`https://i.pravatar.cc/150?img=${i + 20}`}
                        alt="user"
                    />
                    ))}
                </div> */}
                <div>
                    <div className="text-white font-bold text-lg">5,000+</div>
                    <div className="text-white/60 text-sm">Petani Sukses</div>
                </div>
                </div>
            </div>
            </motion.div>
        </div>
        </section>
    )
    }