import React, { useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import Webcam from 'react-webcam'
import { 
  Camera, 
  Upload, 
  Leaf, 
  RefreshCcw, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Lightbulb, 
  X, 
  ShieldCheck, 
  Zap 
} from 'lucide-react'

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
  //  Menambahkan tipe data <File | null>, <string | null>, dan <any>
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [aiSolution, setAiSolution] = useState("")
  const [loadingAi, setLoadingAi] = useState(false)
  const [showWebcam, setShowWebcam] = useState(false)
  
  // Menambahkan tipe data <Webcam>
  const webcamRef = useRef<Webcam>(null)

  // Menambahkan tipe data parameter event
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
      setAiSolution("")
      setIsModalOpen(false)
      setShowWebcam(false)
    }
  }

  const captureWebcam = useCallback(async () => {
    //  Menambahkan tanda tanya (?) untuk optional chaining
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      const res = await fetch(imageSrc)
      const blob = await res.blob()
      const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" })
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
      setAiSolution("")
      setShowWebcam(false)
      setIsModalOpen(false)
    }
  }, [webcamRef])

  // FIX: Menambahkan tipe data parameter (diseaseName: string)
  const fetchGrokSolution = async (diseaseName: string) => {
    setLoadingAi(true);
    setAiSolution("");
    try {
      // FIX: Menambahkan '(import.meta as any)' untuk bypass error TS environment
      const API_URL = (import.meta as any).env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${API_URL}/api/solution`, { disease_name: diseaseName });
      setAiSolution(response.data?.solution || "Solusi tidak tersedia untuk saat ini.");
    } catch (error) {
      setAiSolution("Gagal memuat rekomendasi otomatis.");
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
      const API_URL = (import.meta as any).env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${API_URL}/predict`, formData)
      const rawPrediction = response.data.prediction;
      
      // FIX: Memberitahu TS bahwa rawPrediction adalah bagian dari index diseaseTranslation
      const translatedName = diseaseTranslation[rawPrediction as keyof typeof diseaseTranslation] || rawPrediction.replace(/_/g, ' ');
      const isHealthy = translatedName.toLowerCase().includes("sehat");

      setResult({ ...response.data, translatedName, isHealthy })
      if (!isHealthy) fetchGrokSolution(translatedName);
    } catch (err) {
      setError('Gagal menghubungi server AI. Pastikan sistem backend aktif.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    setAiSolution("")
  }

  return (
    <div className="min-h-screen bg-[#052e16] text-white font-sans pt-28 md:pt-36">
      <div className="max-w-[1170px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: INFORMATION */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
            <ShieldCheck size={16} />
            Sistem Deteksi Presisi
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] ">
              Pertanian Cerdas <br />
              <span className="text-emerald-500">Ramah Lingkungan</span>
            </h1>
            <p className="text-lg text-emerald-50/70 leading-relaxed max-w-lg">
              Lindungi tanaman Anda dari ancaman penyakit dengan teknologi Computer Vision. 
              Deteksi dini membantu mengurangi penggunaan pestisida berlebih dan menjaga ekosistem tetap seimbang.
            </p>
          </div>

          <div className="grid gap-4 max-w-md">
            <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Search size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Identifikasi Real-time</h4>
                <p className="text-sm text-emerald-50/60">Hasil diagnosis penyakit muncul dalam hitungan milidetik setelah pemindaian.</p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">Saran Penanganan</h4>
                <p className="text-sm text-emerald-50/60">Dapatkan rekomendasi teknis yang aman bagi lingkungan untuk mengatasi infeksi.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE APP */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden text-slate-900"
        >
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Leaf className="text-emerald-600" size={20} />
              </div>
              <span className="font-bold text-slate-800">Diagnosis AI</span>
            </div>
            {preview && (
              <button onClick={handleClear} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-full transition-colors uppercase tracking-wider">
                Reset
              </button>
            )}
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {!preview ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50"
                >
                  <div className="h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-emerald-600 mb-6">
                    <Camera size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Belum ada data</h3>
                  <p className="text-slate-500 text-sm mb-10 text-center px-10">Ambil foto daun yang bermasalah untuk mulai dianalisis oleh AI kami.</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 active:scale-95"
                  >
                    Mulai Diagnosis
                  </button>
                </motion.div>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="relative rounded-3xl overflow-hidden border-4 border-slate-50 shadow-inner mb-6">
                    <img src={preview} alt="Upload" className="w-full h-72 object-cover" />
                    <div className="absolute top-4 left-4">
                       <div className="bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
                         Citra Terpilih
                       </div>
                    </div>
                  </div>

                  {!result && (
                    <button 
                      onClick={handleUpload} 
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-emerald-950 text-white py-5 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-xl"
                    >
                      {loading ? <RefreshCcw className="animate-spin" size={20} /> : <Zap size={20} className="text-emerald-400" />}
                      {loading ? "Menganalisis Citra..." : "Proses Deteksi Sekarang"}
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-3 p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-sm font-medium">
                <AlertCircle size={20} />
                {error}
              </motion.div>
            )}

            {/* RESULTS UI */}
            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 space-y-6"
                >
                  <div className={`p-5 rounded-2xl border-2 flex items-center gap-4 ${result.isHealthy ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-orange-50 border-orange-100 text-orange-800'}`}>
                    <div className={`p-3 rounded-xl ${result.isHealthy ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {result.isHealthy ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold opacity-60 tracking-wider">Status Kesehatan</div>
                      <div className="text-xl font-extrabold leading-tight">{result.isHealthy ? "Tanaman Sehat" : "Terdeteksi Patogen"}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Identitas</div>
                      <div className="font-bold text-slate-800 truncate">{result.translatedName}</div>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Akurasi AI</div>
                      <div className="font-extrabold text-emerald-600">{result.confidence_percent}</div>
                    </div>
                  </div>

                  {!result.isHealthy && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-800 font-bold ml-1">
                        <Zap size={16} className="text-amber-500 fill-amber-500" />
                        Rekomendasi AI 
                      </div>
                      <div className="p-5 bg-slate-900 text-slate-200 rounded-2xl text-sm leading-relaxed shadow-2xl border border-slate-800">
                        {loadingAi ? (
                          <div className="flex gap-2 py-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        ) : <p className="leading-relaxed">{aiSolution}</p>}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleClear}
                    className="w-full flex items-center justify-center gap-2 border-2 border-slate-100 py-4 rounded-2xl text-slate-500 text-sm font-bold hover:bg-slate-50 hover:text-slate-800 transition-all"
                  >
                    <RefreshCcw size={16} />
                    Diagnosis Baru
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* MODAL / DIALOG */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 text-slate-900"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                <X size={20} />
              </button>

              {showWebcam ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-bold text-2xl">Kamera Aktif</h3>
                    <p className="text-sm text-slate-500 mt-1">Posisikan daun di tengah bingkai</p>
                  </div>
                  <div className="rounded-[2rem] overflow-hidden bg-black aspect-square flex items-center justify-center border-8 border-slate-50 shadow-2xl">
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" height="100%" className="object-cover h-full w-full" videoConstraints={{ facingMode: "environment" }} />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setShowWebcam(false)} className="flex-1 bg-slate-100 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">Batal</button>
                    <button onClick={captureWebcam} className="flex-[2] bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                      <Camera size={20} /> Ambil Foto
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 py-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-slate-900">Pilih Sumber</h3>
                    <p className="text-sm text-slate-500 mt-1">Gunakan kamera atau ambil dari galeri</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <button onClick={() => setShowWebcam(true)} className="flex flex-col items-center gap-4 p-8 rounded-[2rem] border-2 border-slate-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                      <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-600 transition-colors">
                        <Camera size={32} />
                      </div>
                      <span className="font-bold text-slate-700">Kamera</span>
                    </button>
                    <label className="flex flex-col items-center gap-4 p-8 rounded-[2rem] border-2 border-slate-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all group cursor-pointer">
                      <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-100 text-slate-600 group-hover:text-emerald-600 transition-colors">
                        <Upload size={32} />
                      </div>
                      <span className="font-bold text-slate-700">Galeri</span>
                      <input type="file" accept="image/*" onChange={handleFileSelect} hidden />
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Detection;