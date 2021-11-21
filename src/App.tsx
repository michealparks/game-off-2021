import * as THREE from 'three'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import { useStats } from './hooks/useStats'
import Interface from './interface'
import Model from './models/computer'

const App = () => {
  if (import.meta.env.DEV) {
    useStats()
  }

  return (
    <div className='h-screen w-screen'>
      <Canvas
        mode='concurrent'
        dpr={Math.min(1.5, window.devicePixelRatio)}
        gl={{ antialias: false }}
        camera={{ position: new THREE.Vector3(0, 0, 0.5) }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
      
        <Model />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.1} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
      <Interface />
    </div>
  )
}

export default App
