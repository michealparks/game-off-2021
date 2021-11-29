import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveEvents, AdaptiveDpr, useDetectGPU } from '@react-three/drei'
import { useStats } from './hooks/useStats'
import Interface from './interface'
import Effects from './Effects'
import Computer from './models/computer'
import Lights from './Lights'
import { Suspense, useEffect } from 'react'
import { audio } from './util/audio'

audio.create('click', new URL('./assets/click.wav', import.meta.url).href)
audio.create('attach', new URL('./assets/attach.wav', import.meta.url).href)
audio.create('remove', new URL('./assets/remove.wav', import.meta.url).href)

audio.create('track1', new URL('./assets/track_1.mp3', import.meta.url).href)

const App = () => {
  if (import.meta.env.DEV) {
    useStats()
  }

  useEffect(() => {
    document.addEventListener('click', () => {
      audio.loop('track1')
    }, { once: true })
  }, [])

  const { tier, gpu = '' } = useDetectGPU()
  const isLowTierGPU = tier < 2 && /apple (gpu|m1)/i.test(gpu) === false

  return (
    <div className='h-screen w-screen'>
      <Canvas
        shadows
        mode='concurrent'
        performance={{ min: 0.75 }}
        dpr={Math.min(isLowTierGPU ? 0.9 : 1.5, window.devicePixelRatio)}
        gl={{ alpha: false, antialias: false }}
        camera={{ position: new THREE.Vector3(0.25, 0.15, 0.25) }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Effects />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
        <Lights bake={isLowTierGPU} />
        <Computer />
      </Canvas>
      <Interface />
    </div>
  )
}

export default App
