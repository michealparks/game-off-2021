import React from 'react'
import { useGLTF } from '@react-three/drei'
import { COMPUTER_URL, GLTFResult } from './constants'
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
        geometry={nodes.motherboard.geometry}
        material={materials.green}
      />
      <GPU />
      <mesh
        geometry={nodes.io.geometry}
        material={nodes.io.material}
        position={[-0.09, 0.01, 0.03]}
      />
      <mesh
        geometry={nodes['motherboard-gpu-io'].geometry}
        material={nodes['motherboard-gpu-io'].material}
        position={[-0.04, -0.08, -0.01]}
      />
      <mesh
        geometry={nodes['motherboard-cpu-io'].geometry}
        material={materials.white}
      />
      <RAM />
      <CPU />
      <SSD />
    </group>
  )
}

export default Model
