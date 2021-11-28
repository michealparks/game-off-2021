import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveEvents } from '@react-three/drei'
import { useStats } from './hooks/useStats'
import Interface from './interface'
import Effects from './Effects'
import Computer from './models/computer'

const App = () => {
  if (import.meta.env.DEV) {
    useStats()
  }

  return (
    <div className='h-screen w-screen'>
      <Canvas
        mode='concurrent'
        dpr={Math.min(1.5, window.devicePixelRatio)}
        gl={{ antialias: true }}
        camera={{ position: new THREE.Vector3(-0.25, 0.25, 0.25) }}
      >
        <AdaptiveEvents />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />

        <Computer />

        <Effects />
      </Canvas>
      <Interface />
    </div>
  )
}

export default App
