
import { BakeShadows, SoftShadows, useDetectGPU } from '@react-three/drei'

interface Props {
  bake: boolean
}

const Lights = ({ bake }: Props) => {
  SoftShadows({})

  const mapsize = 2

  return (
    <>
      {bake && <BakeShadows />}
      <ambientLight intensity={0.1} />
      <directionalLight
        castShadow
        position={[1, 1, 1]}
        intensity={2}
        shadow-bias={-0.001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={25}
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
        shadow-bias={-0.001}
        shadow-mapSize={[2048, 2048]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <rectAreaLight
        color="red"
        intensity={0.3}
        position={[1.5, -1, 3]}
        width={10} height={10}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
    </>
  )
}

export default Lights
