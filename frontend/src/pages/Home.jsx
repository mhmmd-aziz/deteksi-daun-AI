import { Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Float, Environment, ContactShadows } from '@react-three/drei'

// --- Komponen Model 3D dengan Animasi Scroll ---
function AnimatedLeafModel() {
  const { scene } = useGLTF('/hitem3d.glb') 
  const groupRef = useRef()

  useFrame((state) => {
    const scrollY = window.scrollY
    if (groupRef.current) {
      groupRef.current.position.x = 2.5 - (scrollY / 300)
      groupRef.current.position.z = -(scrollY / 250)
      groupRef.current.rotation.y = (state.clock.elapsedTime * 0.3) - (scrollY / 200)
      groupRef.current.rotation.z = (scrollY / 500) 
    }
  })

  return (
    <group ref={groupRef} position={[2.5, -1, 0]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <primitive object={scene} scale={2.2} />
      </Float>
      <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={25} blur={2.5} far={10} />
    </group>
  )
}

function Home() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const fadeRightVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="home-wrapper">
      
      {/* --- BACKGROUND 3D (DIAM FULLSCREEN) --- */}
      <div className="hero-3d-fixed">
        <Canvas camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 1000 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#dcfce7" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#16a34a" />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <AnimatedLeafModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* --- SECTION 1: HERO (GLASSMORPHISM) --- */}
      <div className="home-container">
        <div className="hero-content-left">
          <motion.div 
            className="glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeLeftVariant}
          >
            <motion.div className="hero-badge">
               Inovasi Teknologi Tepat Guna
            </motion.div>
            
            <h1 className="hero-title">
              Selamatkan Panen <br/>
              Anda dari <span className="text-gradient">Penyakit Daun</span>
            </h1>
            <p className="hero-subtitle">
              Diagnosis instan, akurat, dan inovatif. Mendukung keberlanjutan <strong>Lingkungan & Ekonomi</strong> pertanian menggunakan Kecerdasan Buatan.
            </p>
            
            <div className="hero-buttons">
              <Link to="/detect">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(22, 163, 74, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                   Mulai Analisis
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- SECTION 2: FITUR & KEUNGGULAN --- */}
      <div className="home-section-two">
        <div className="section-two-content">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={fadeUpVariant}
          >
            Kenapa Memilih LeafAI?
          </motion.h2>
          
          <div className="feature-grid">
            <motion.div className="feature-card" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={fadeUpVariant}>
              <h3>Analisis Instan</h3>
              <p>Hanya butuh beberapa detik untuk mengetahui kondisi tanaman Anda menggunakan AI MobileNetV2 langsung dari browser.</p>
            </motion.div>
            <motion.div className="feature-card" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={{...fadeUpVariant, visible: {...fadeUpVariant.visible, transition: {delay: 0.2, duration: 0.6}}}}>
              <h3>Akurasi Tinggi</h3>
              <p>Dilatih dengan dataset ribuan citra daun, memberikan diagnosis yang sangat presisi layaknya pakar pertanian.</p>
            </motion.div>
            <motion.div className="feature-card" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={{...fadeUpVariant, visible: {...fadeUpVariant.visible, transition: {delay: 0.4, duration: 0.6}}}}>
              <h3>Ramah Lingkungan</h3>
              <p>Dengan diagnosis yang tepat, penggunaan pestisida dapat dikurangi untuk menjaga ekosistem tetap sehat.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: CARA KERJA --- */}
      <div className="home-section-three">
        <motion.h2 
          className="section-title-center"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={fadeUpVariant}
        >
          Cara Kerja Sistem
        </motion.h2>

        <div className="steps-container">
          <motion.div className="step-card" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={fadeLeftVariant}>
            <div className="step-number">1</div>
            <h3>Ambil Foto</h3>
            <p>Arahkan kamera HP Anda ke daun yang sakit atau unggah dari galeri foto.</p>
          </motion.div>

          <motion.div className="step-card" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={fadeRightVariant}>
            <div className="step-number">2</div>
            <h3>AI Analisis</h3>
            <p>Sistem akan memproses gambar menggunakan model Deep Learning secara real-time.</p>
          </motion.div>

          <motion.div className="step-card" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={fadeLeftVariant}>
            <div className="step-number">3</div>
            <h3>Dapatkan Solusi</h3>
            <p>Hasil identifikasi penyakit dan persentase keyakinan AI akan langsung muncul di layar Anda.</p>
          </motion.div>
        </div>
      </div>

      {/* --- SECTION 4: CALL TO ACTION --- */}
      <div className="home-section-four">
        <motion.div 
          className="cta-card glass-card"
          initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={fadeUpVariant}
        >
          <h2>Siap Menyelamatkan Panen Anda?</h2>
          <p>Mulai gunakan LeafAI sekarang secara gratis dan cegah penyebaran penyakit tanaman lebih dini.</p>
          <Link to="/detect">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="btn-primary" style={{ marginTop: '20px' }}
            >
              Coba Deteksi Sekarang
            </motion.button>
          </Link>
        </motion.div>
      </div>

    </div>
  )
}

export default Home