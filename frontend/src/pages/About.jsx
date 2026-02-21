import { motion } from 'framer-motion'

function About() {
  return (
    <div className="page-container about-page">
      <motion.div 
        className="card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ color: '#15803d', marginBottom: '20px' }}>Mewujudkan INNOVATE dengan LeafAI</h1>
        <p style={{ lineHeight: '1.6', color: '#4b5563', marginBottom: '15px' }}>
          Sejalan dengan tema kompetisi <strong>INNOVATE (Impel Novelty, Navigate, Optimize, Validate, Advance Technological Endeavors)</strong>, 
          LeafAI hadir sebagai solusi teknologi di subtema <strong>Lingkungan dan Ekonomi</strong>.
        </p>
        <p style={{ lineHeight: '1.6', color: '#4b5563', marginBottom: '15px' }}>
          Penyakit tanaman sering kali terlambat disadari oleh petani, menyebabkan meluasnya gagal panen yang berdampak pada ekonomi. 
          LeafAI mengoptimalkan pemanfaatan model <em>Deep Learning</em> (MobileNetV2) dengan akurasi pengujian mencapai <strong>99%</strong> untuk memberikan diagnosis yang valid, instan, dan responsif langsung dari genggaman pengguna.
        </p>
        <div className="tech-stack" style={{ marginTop: '30px', padding: '15px', background: '#f8fafc', borderRadius: '10px' }}>
          <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>Arsitektur Sistem:</h3>
          <ul style={{ paddingLeft: '20px', color: '#64748b' }}>
            <li><strong>Frontend Interaktif:</strong> React.js, Vite, Framer Motion</li>
            <li><strong>Backend API:</strong> Python, FastAPI</li>
            <li><strong>Kecerdasan Buatan:</strong> PyTorch (Transfer Learning)</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default About