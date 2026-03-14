import React, { useState } from 'react'
import ThreeBackground from '../components/home/ThreeBackground'
import Hero from '../components/home/Hero'
import { Features } from '../components/home/Features'
import { CTA } from '../components/home/CTA'

const Home: React.FC = () => {
  // State untuk mengontrol index carousel (0 = Sistem, 1 = Paprika, 2 = Tomat, 3 = Kentang)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative w-full min-h-screen bg-[#052e16] overflow-x-hidden">
      
      {/* Background 3D akan menerima activeIndex agar tahu harus memutar model yang mana */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <ThreeBackground activeIndex={activeIndex} />
      </div>

      {/* Hero akan menerima state untuk mengubah teks dan tombol Next/Prev */}
      <Hero activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      
      <Features />
      
      <div className="relative z-10 w-full">
        <CTA /> 
      </div>
      
    </div>
  )
}

export default Home