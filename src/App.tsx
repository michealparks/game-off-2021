import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveEvents, BakeShadows, softShadows } from '@react-three/drei'
import { useStats } from './hooks/useStats'
import Interface from './interface'
import Effects from './Effects'
import Computer from './models/computer'
import Lights from './Lights'

softShadows({
  frustum: 10.75,
  size: 10.5,
  near: 9.5,
  samples: 17,
  rings: 30, // Rings (default: 11) must be a int
})

const App = () => {
  if (import.meta.env.DEV) {
    useStats()
  }

  return (
    <div className='h-screen w-screen'>
      <Canvas
        shadows
        mode='concurrent'
        performance={{ min: 0.5 }}
        dpr={Math.min(2, window.devicePixelRatio)}
        gl={{ alpha: false, antialias: false }}
        camera={{ position: new THREE.Vector3(-0.25, 0.25, 0.25) }}
      >
        <AdaptiveEvents />
        {/* <BakeShadows /> */}

        <Lights />

        {/* <ambientLight intensity={0.5} />

        <pointLight
          castShadow
          intensity={0.9}
          position={[0.5, 1, 1]}
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
        /> */}

        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />

        <Computer />

        <Effects />
      </Canvas>
      <Interface />
    </div>
  )
}

export default App
