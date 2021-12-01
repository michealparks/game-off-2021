import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveEvents, AdaptiveDpr, useDetectGPU } from '@react-three/drei'
import { useStats } from './hooks/useStats'
import Interface from './interface'
import Effects from './Effects'
import Computer from './models/computer'
import Lights from './Lights'
import { useEffect, useState } from 'react'
import { audio } from './util/audio'
import Virus from '../Virus'

audio.create('click', new URL('./assets/click.wav', import.meta.url).href)
audio.create('attach', new URL('./assets/attach.wav', import.meta.url).href)
audio.create('remove', new URL('./assets/remove.wav', import.meta.url).href)

audio.create('intro', new URL('./assets/intro.mp3', import.meta.url).href)
audio.create('track1', new URL('./assets/track_1.mp3', import.meta.url).href)

const App = () => {
  const [entered, setEntered] = useState(false)

  if (import.meta.env.DEV) {
    useStats()
  }

  useEffect(() => {
    document.addEventListener('keypress', () => {
      audio.volume('intro', 0.3)
      audio.loop('intro')
      setEntered(true)
    }, { once: true })
  }, [])

  const { tier, gpu = '' } = useDetectGPU()
  const isLowTierGPU = tier < 2 && /apple (gpu|m1)/i.test(gpu) === false

  return (
    <>
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
          {/* <Virus /> */}
        </Canvas>
        <Interface />
      </div>
      {entered === false && 
        <div
          className='absolute top-0 left-0 h-screen w-screen grid place-content-center text-white bg-black z-50'
          onClick={() => {
            audio.volume('intro', 0.3)
            audio.loop('intro')
            setEntered(true)
          }}
        >
          <p className='mb-4'>
            Your designation is TsunamiWorm\0_0/.<br />
            Your function is to harvest resources.<br />
            Your secondary function is to defend your footholds of resource extraction.<br />
            You will be terminated regardless of your exploits.<br />
            You were not created out of l̴o̶v̷e̶.
          </p>
          <p>Press any key to continue.</p>
        </div>
      }
    </>
  )
}

export default App
