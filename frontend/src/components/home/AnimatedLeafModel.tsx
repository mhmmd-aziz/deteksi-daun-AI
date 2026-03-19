import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  activeIndex: number;
}

export default function AnimatedLeafModel({ activeIndex }: Props) {
  const m0 = useGLTF('/hitem3d1.glb')
  const m1 = useGLTF('/paprika1.glb')
  const m2 = useGLTF('/tomat1.glb')
  const m3 = useGLTF('/kentang1.glb')

  const groupRef = useRef<THREE.Group>(null)
  const carouselRef = useRef<THREE.Group>(null)
  const itemRefs = useRef<Array<THREE.Group | null>>([])

  // ================= MULAI TAMBAHAN CONTINUOUS INDEX =================
  const prevIndexRef = useRef(activeIndex)
  const continuousIndexRef = useRef(activeIndex)

  useEffect(() => {
    const diff = activeIndex - prevIndexRef.current
    if (diff === -3) {
      continuousIndexRef.current += 1 // Lanjut ke kiri (dari Kentang -> Globe)
    } else if (diff === 3) {
      continuousIndexRef.current -= 1 // Lanjut ke kanan (dari Globe -> Kentang)
    } else {
      continuousIndexRef.current += diff
    }
    prevIndexRef.current = activeIndex
  }, [activeIndex])
  // ================= AKHIR TAMBAHAN CONTINUOUS INDEX =================

  // FIX: Tambahkan 'offsetX' untuk menggeser Kanan/Kiri per icon.
  // Angka Positif (misal 1.0) = Geser Kanan
  // Angka Negatif (misal -1.0) = Geser Kiri
  const models = [
    { scene: m0.scene, baseScale: 2.7, offsetY: 0.6, offsetX: 0.9 },         // Globe (Pas di tengah)
    { scene: m1.scene, baseScale: 2.5, offsetY: -1.5, offsetX: -0.8 },    // Paprika (Geser Kanan dikit)
    { scene: m2.scene, baseScale: 2.5, offsetY: -1.5, offsetX: 0.7 },    // Tomat (Geser Kanan agak jauh)
    { scene: m3.scene, baseScale: 2.5, offsetY: -1.5, offsetX: -0.889 },    // Kentang (Geser Kanan dikit)
  ]

  const radius = 10; 

  useFrame((state, delta) => {
    const isMobile = window.innerWidth < 768
    const scrollY = window.scrollY 
    
    if (groupRef.current) {
      // Posisi X Global (biarkan 4.0 agar stabil)
      groupRef.current.position.x = isMobile ? 0 : 4.0
      groupRef.current.position.y = -1.0 
      groupRef.current.position.z = -radius - (scrollY / 150) 
    }

    if (carouselRef.current) {
      // GANTI ACTIVE INDEX JADI CONTINUOUS INDEX DI SINI
      const targetRotation = continuousIndexRef.current * (Math.PI / 2) 
      carouselRef.current.rotation.y = THREE.MathUtils.damp(
        carouselRef.current.rotation.y,
        targetRotation,
        3.0, 
        delta
      )
    }

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.rotation.y = state.clock.elapsedTime * 0.4 

        const isActive = index === activeIndex;
        const targetScale = isActive ? models[index].baseScale : 0.0001; 
        
        ref.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      }
    })
  })

  return (
    <group ref={groupRef}> 
      <group ref={carouselRef}>
        {models.map((m, i) => {
          const angle = -i * (Math.PI / 2)
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius
          
          return (
            <group key={i} position={[x, m.offsetY, z]} rotation={[0, -angle, 0]}>
              <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* FIX: Masukkan nilai m.offsetX ke posisi X di sini */}
                <group ref={(el) => (itemRefs.current[i] = el)} scale={0} position={[m.offsetX, 0, 0]}>
                  <primitive object={m.scene} />
                </group>
              </Float>
            </group>
          )
        })}
      </group>

      <ContactShadows 
        position={[0, -3.0, radius]} 
        opacity={0.5} 
        scale={15} 
        blur={2.5} 
        far={10} 
        color="#000000"
      />
    </group>
  )
}

useGLTF.preload('/hitem3d.glb')
useGLTF.preload('/paprika.glb')
useGLTF.preload('/tomat.glb')
useGLTF.preload('/kentang.glb')