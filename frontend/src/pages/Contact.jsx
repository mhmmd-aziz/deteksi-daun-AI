import { motion } from 'framer-motion'
import { useState } from 'react'

function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000); // Reset notifikasi setelah 3 detik
  }

  return (
    <div className="page-container contact-page">
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <h1 style={{ color: '#15803d', marginBottom: '10px' }}>Hubungi Tim Kami</h1>
        <p style={{ color: '#6b7280', marginBottom: '25px', fontSize: '0.95rem' }}>
          Punya pertanyaan terkait teknologi atau ingin berkolaborasi? Kirimkan pesan Anda.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#374151' }}>Nama Lengkap</label>
            <input type="text" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} placeholder="Masukkan nama Anda" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#374151' }}>Email</label>
            <input type="email" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} placeholder="Masukkan email aktif" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#374151' }}>Pesan</label>
            <textarea required rows="4" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} placeholder="Tulis pesan Anda di sini..."></textarea>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary" 
            type="submit"
            style={{ marginTop: '10px', width: '100%' }}
          >
            {sent ? '✅ Pesan Terkirim!' : 'Kirim Pesan'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default Contact