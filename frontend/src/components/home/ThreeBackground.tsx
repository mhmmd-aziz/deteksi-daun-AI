import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import AnimatedLeafModel from './AnimatedLeafModel'

interface Props {
  activeIndex: number;
}

export default function ThreeBackground({ activeIndex }: Props) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Environment preset="forest" />
        <Suspense fallback={null}>
          <AnimatedLeafModel activeIndex={activeIndex} />
        </Suspense>
        {/* OrbitControls kita matikan rotasinya agar tidak mengganggu efek putaran carousel */}
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}