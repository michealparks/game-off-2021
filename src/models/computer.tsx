import { useGLTF } from '@react-three/drei'
import { COMPUTER_URL, GLTFResult } from './constants'
import PSU from './psu'
import GPU from './gpu'
import CPU from './cpu'
import RAM from './ram'
import SSD from './ssd'

useGLTF.preload(COMPUTER_URL)

const Model = ({ ...props }: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh 
        name="motherboard"
        receiveShadow
        geometry={nodes.motherboard.geometry}
        material={materials.green}
      />
      <mesh
        castShadow
        receiveShadow
        name="io"
        geometry={nodes.io.geometry}
        material={nodes.io.material}
        position={[-0.092, 0.014, 0.032]}
      />
      <mesh
        castShadow
        receiveShadow
        name="motherboard_gpu_io"
        geometry={nodes.motherboard_gpu_io.geometry}
        material={nodes.motherboard_gpu_io.material}
        position={[-0.044, -0.077, 0.009]}
      />
      <mesh
        castShadow
        receiveShadow
        name="motherboard_cpu_io"
        geometry={nodes.motherboard_cpu_io.geometry}
        material={materials.white}
        position={[0, 0, 0.005]}
      />
      <mesh
        castShadow
        receiveShadow
        name="ram_io"
        geometry={nodes.ram_io.geometry}
        material={nodes.ram_io.material}
        position={[0.078, 0.013, 0.008]}
      />
      <PSU />
      <GPU />
      <RAM />
      <CPU />
      <SSD />
    </group>
  )
}

export default Model
