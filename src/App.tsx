import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveEvents, AdaptiveDpr } from '@react-three/drei'
import { useStats } from './hooks/useStats'
import Interface from './interface'
import Effects from './Effects'
import Computer from './models/computer'
import Lights from './Lights'
import { Suspense } from 'react'
import { audio } from './util/audio'

audio.create('attach', new URL('./assets/attach.wav', import.meta.url).href)
audio.create('remove', new URL('./assets/remove.wav', import.meta.url).href)

const App = () => {
  if (import.meta.env.DEV) {
    useStats()
  }

  return (
    <div className='h-screen w-screen'>
      <Suspense fallback={null}>
        <Canvas
          shadows
          mode='concurrent'
          performance={{ min: 0.7 }}
          dpr={Math.min(1.5, window.devicePixelRatio)}
          gl={{ alpha: false, antialias: false }}
          camera={{ position: new THREE.Vector3(0.25, 0.15, 0.25) }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Effects />
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
          <Lights />
          <Computer />
        </Canvas>
      </Suspense>
      <Interface />
    </div>
  )
}

export default App
