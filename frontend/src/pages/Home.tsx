import React from 'react'
import ThreeBackground from '../components/home/ThreeBackground'
import Hero from '../components/home/Hero'
import { Features } from '../components/home/Features'
import { CTA } from '../components/home/CTA'

const Home: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#052e16] overflow-x-hidden">
      
      {/* PERBAIKAN: 
        Membungkus ThreeBackground dalam div fixed agar tidak tertutup background gambar di Hero.
        z-[5] menempatkan bumi di depan background Hero (z-0), 
        tapi tetap di belakang konten teks Hero (z-10).
      */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <ThreeBackground />
      </div>

      {/* Konten utama tetap relative agar bisa di-scroll */}
        <Hero />
        <Features />
      <div className="relative z-10 w-full">
        <CTA /> 
      </div>
      
    </div>
  )
}

export default Home