import { useGLTF, Merged } from '@react-three/drei'
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
      <Merged
        castShadow
        receiveShadow
        meshes={[
          nodes.motherboard,
          nodes.io,
          nodes.motherboard_gpu_io,
          nodes.motherboard_cpu_io,
          nodes.ram_io,
        ]}
      >
        {/* @ts-ignore */}
        {(Motherboard, IO, GpuIO, CpuIO, RamIO) => (
          <>
            <Motherboard
              name='motherboard'
              material={materials.green}
            />
            <IO
              name='io'
              material={nodes.io.material}
              position={[-0.092, 0.014, 0.032]}
            />
            <GpuIO
              name='motherboard_gpu_io'
              material={nodes.motherboard_gpu_io.material}
              position={[-0.044, -0.077, 0.009]}
            />
            <CpuIO
              name="motherboard_cpu_io"
              material={materials.white}
              position={[0, 0, 0.005]}
            />
            <RamIO
              name='ram_io'
              material={nodes.ram_io.material}
              position={[0.078, 0.013, 0.008]}
            />
          </>
        )}
      </Merged>

      <PSU />
      <GPU />
      <RAM />
      <CPU />
      <SSD />
    </group>
  )
}

export default Model
