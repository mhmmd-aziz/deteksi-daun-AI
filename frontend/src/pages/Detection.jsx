import { useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import Webcam from 'react-webcam'

// Kamus Terjemahan Universal
const diseaseTranslation = {
  "Pepper__bell___Bacterial_spot": "Bercak Bakteri (Bacterial Spot)",
  "Pepper__bell___healthy": "Daun Sehat",
  "Potato___Early_blight": "Bercak Awal (Early Blight)",
  "Potato___Late_blight": "Hawar Daun (Late Blight)",
  "Potato___healthy": "Daun Sehat",
  "Tomato_Bacterial_spot": "Bercak Bakteri (Bacterial Spot)",
  "Tomato_Early_blight": "Bercak Awal (Early Blight)",
  "Tomato_Late_blight": "Hawar Daun (Late Blight)",
  "Tomato_Leaf_Mold": "Infeksi Jamur Daun (Leaf Mold)",
  "Tomato_Septoria_leaf_spot": "Bercak Daun Septoria",
  "Tomato_Spider_mites_Two_spotted_spider_mite": "Hama Tungau Laba-laba",
  "Tomato__Target_Spot": "Bercak Target (Target Spot)",
  "Tomato__Tomato_YellowLeaf__Curl_Virus": "Virus Daun Kuning Keriting",
  "Tomato__Tomato_mosaic_virus": "Virus Mosaik",
  "Tomato_healthy": "Daun Sehat"
}

function Detection() {
  // State untuk Deteksi Gambar
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // State BARU untuk AI Solusi Grok
  const [aiSolution, setAiSolution] = useState("")
  const [loadingAi, setLoadingAi] = useState(false)

  // State BARU untuk menangani Webcam
  const [showWebcam, setShowWebcam] = useState(false)
  const webcamRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
      setAiSolution("") // Reset solusi saat ganti foto
      setIsModalOpen(false) // Tutup pop-up setelah pilih foto
      setShowWebcam(false) // Tutup webcam jika aktif
    }
  }

  // Fungsi untuk mengambil foto dari Webcam
  const captureWebcam = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) {
      // Mengubah base64 dari webcam menjadi File
      const res = await fetch(imageSrc)
      const blob = await res.blob()
      const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" })

      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
      setAiSolution("")
      setShowWebcam(false) // Matikan layar webcam
      setIsModalOpen(false) // Tutup pop-up
    }
  }, [webcamRef])

  // Fungsi untuk memanggil AI lewat FastAPI (Backend)
  const fetchGrokSolution = async (diseaseName) => {
    setLoadingAi(true);
    setAiSolution(""); // Reset solusi sebelumnya

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      
      // Kirim request ke backend FastAPI kamu
      const response = await axios.post(`${API_URL}/api/solution`, {
        disease_name: diseaseName
      });

      if (response.data && response.data.solution) {
        setAiSolution(response.data.solution);
      } else {
        setAiSolution("Maaf, tidak dapat memuat solusi saat ini.");
      }
    } catch (error) {
      console.error("Error fetching dari backend FastAPI:", error);
      setAiSolution("Gagal mendapatkan solusi dari AI. Pastikan backend FastAPI sedang berjalan dan API Key Grok sudah benar di backend.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      // 1. Prediksi Penyakit via FastAPI
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      
      const rawPrediction = response.data.prediction;
      const translatedName = diseaseTranslation[rawPrediction] || rawPrediction.replace(/_/g, ' ');
      const isHealthy = translatedName.toLowerCase().includes("sehat");

      setResult({
        ...response.data,
        translatedName,
        isHealthy
      })
      
      // 2. JIKA SAKIT, Panggil Grok API untuk Solusi
      if (!isHealthy) {
        fetchGrokSolution(translatedName);
      }
      
    } catch (err) {
      setError('Gagal terhubung ke server AI. Pastikan FastAPI sedang berjalan.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    setAiSolution("") // Reset text solusi
  }

  return (
    <div className="detection-wrapper page-container">
      
      {/* KARTU UTAMA DETEKSI */}
      <motion.div 
        className="detection-card glass-card-solid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="detection-header">
          <h2>Analisis Daun AI</h2>
          <p>Sistem akan memindai daun untuk mendeteksi penyakit secara instan.</p>
        </div>

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="empty-state-section"
            >
              <div className="empty-state-icon">📷</div>
              <p className="empty-state-text">Belum ada gambar yang dipilih.</p>
              
              {/* Tombol Buka Pop-up */}
              <button 
                className="btn-primary btn-large" 
                onClick={() => setIsModalOpen(true)}
              >
                + Tambahkan Foto Daun
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="preview-state"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="preview-section"
            >
              <img src={preview} alt="Preview Daun" className="image-preview" />
              
              {!result && (
                <div className="action-buttons">
                  <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
                    {loading ? (
                      <span className="loading-content">
                        <span className="spinner"></span> AI Sedang Bekerja...
                      </span>
                    ) : 'Mulai Diagnosis AI'}
                  </button>
                  <button className="clear-btn" onClick={handleClear} disabled={loading}>
                    Ganti Foto
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifikasi Error */}
        {error && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="error-box">
            {error}
          </motion.div>
        )}

        {/* Hasil Prediksi */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`result-box ${result.isHealthy ? 'box-healthy' : 'box-danger'}`}
            >
              <h3 className="result-title">
                {result.isHealthy ? "Tanaman Sehat" : "Penyakit Terdeteksi!"}
              </h3>
              
              <div className="result-details">
                <div className="detail-item">
                  <span className="label">Status Kondisi:</span>
                  <span className={`status-badge ${result.isHealthy ? 'badge-healthy' : 'badge-danger'}`}>
                    {result.isHealthy ? 'Sehat' : 'Terinfeksi'}
                  </span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Identifikasi AI:</span>
                  <span className="disease-name">{result.translatedName}</span>
                </div>

                <div className="detail-item">
                  <span className="label">Tingkat Keyakinan:</span>
                  <span className="confidence-text">{result.confidence_percent}</span>
                </div>
              </div>

              {/* BOX SOLUSI AI GROK (Hanya muncul jika sakit) */}
              {!result.isHealthy && (
                <div className="ai-solution-container">
                  <h4 className="ai-solution-title">Rekomendasi Penanganan (AI Grok)</h4>
                  
                  {loadingAi ? (
                    <div className="loading-content" style={{ padding: '15px 0' }}>
                      <div className="spinner"></div>
                      <span>AI sedang menyusun solusi...</span>
                    </div>
                  ) : (
                    <div className="ai-solution-text">
                      <p>{aiSolution}</p>
                    </div>
                  )}
                </div>
              )}

              <button className="reset-btn" onClick={handleClear} style={{ marginTop: '20px' }}>
                Pindai Daun Lainnya
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- POP-UP MODAL PILIH GAMBAR --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsModalOpen(false)
              setShowWebcam(false) // Reset state kamera jika klik di luar modal
            }} 
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <button className="close-modal-btn" onClick={() => {
                setIsModalOpen(false)
                setShowWebcam(false) // Reset state kamera saat tutup modal
              }}>×</button>
              
              {/* JIKA USER MEMILIH BUKA KAMERA LAPTOP */}
              {showWebcam ? (
                <div>
                  <h3 style={{ marginBottom: '15px' }}>Ambil Foto Daun</h3>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid #cbd5e1' }}>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      videoConstraints={{ facingMode: "environment" }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button className="btn-primary" style={{ flex: 1 }} onClick={captureWebcam}>
                      📸 Jepret Sekarang
                    </button>
                    <button className="clear-btn" style={{ flex: 1 }} onClick={() => setShowWebcam(false)}>
                      Kembali
                    </button>
                  </div>
                </div>
              ) : (
                /* TAMPILAN AWAL MEMILIH SUMBER GAMBAR */
                <>
                  <h3>Pilih Sumber Gambar</h3>
                  <p>Dari mana Anda ingin mengambil foto daun?</p>

                  <div className="modal-options-grid">
                    {/* Opsi 1: Buka Kamera via Komponen Webcam */}
                    <div className="modal-option-box" onClick={() => setShowWebcam(true)}>
                      <div className="option-icon">📷</div>
                      <div className="option-title">Buka Kamera</div>
                      <div className="option-desc">Ambil foto langsung</div>
                    </div>

                    {/* Opsi 2: Galeri HP/Laptop */}
                    <label className="modal-option-box">
                      <div className="option-icon">📁</div>
                      <div className="option-title">Buka Galeri</div>
                      <div className="option-desc">Pilih foto tersimpan</div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileSelect} 
                        hidden 
                      />
                    </label>
                  </div>
                </>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Detection