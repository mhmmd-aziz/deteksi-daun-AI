import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export default function AnimatedLeafModel() {
  const { scene } = useGLTF('/hitem3d.glb')
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const scrollY = window.scrollY
    if (groupRef.current) {
      const isMobile = window.innerWidth < 768
      
      // Mengatur posisi X agar tetap di kanan meskipun ukurannya membesar
      // Jika terlalu ke tengah, naikkan 3.8 menjadi 4.0
      groupRef.current.position.x = isMobile ? 0 : 3.8 - (scrollY / 1200) 
      
      groupRef.current.position.z = -(scrollY / 600)
      groupRef.current.rotation.y = (state.clock.elapsedTime * 0.4) - (scrollY / 500)
    }
  })

  return (
    // Kita geser sedikit lebih ke kanan (3.8) karena ukurannya membesar
    <group ref={groupRef} position={[3.8, -0.5, 0]}> 
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* UKURAN DIPERBESAR: Dari 2.2 menjadi 3.2 */}
        <primitive object={scene} scale={2.8} />
      </Float>
      
      {/* Shadow disesuaikan dengan ukuran baru agar tidak terlihat melayang aneh */}
      <ContactShadows 
        position={[0, -3.5, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2.5} 
        far={10} 
      />
    </group>
  )
}