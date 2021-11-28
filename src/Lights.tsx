
import { BakeShadows, softShadows, useDetectGPU } from '@react-three/drei'
import { useEffect, useState } from 'react'

softShadows({
  frustum: 1.75,
  size: 0.01,
  near: 5.5,
  samples: 30,
  rings: 50, // Rings (default: 11) must be a int
})


const Lights = () => {
  const mapsize = 1
  const { tier, gpu } = useDetectGPU()
  const bake = tier < 2 && ! /apple gpu/i.test(gpu ?? '')

  return (
    <>
      {bake && <BakeShadows />}
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={0.5}
        position={[2, 2, 20]}
        color="red"
      />
      <directionalLight
        castShadow
        position={[2, 2, 3]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-mapsize}
        shadow-camera-right={mapsize}
        shadow-camera-top={mapsize}
        shadow-camera-bottom={-mapsize}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <spotLight
        intensity={0.5}
        position={[-5, 10, 2]}
        angle={0.2}
        penumbra={1}
        shadow-mapSize={[2048, 2048]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <rectAreaLight
        intensity={0.5}
        position={[4.5, 0, 2]}
        width={10} height={10}
      />
    </>
  )
}

export default Lights
