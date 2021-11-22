import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import { GLTFResult } from './constants'
import Interface from './interface'
import { useFrame } from '@react-three/fiber'

const GPU = () => {
  const startZ = 0.061
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'gpu'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + startZ : startZ, config }, [active])

  const fan = useRef<THREE.Mesh>(null!)

  useFrame(() => { fan.current.rotation.y += 0.1 })

  return (
    <a.group
      name='gpu'
      onClick={(e) => {
        e.stopPropagation()
        send({ type: 'VIEW_MODULE', module: active ? null : 'gpu' })
      }}
      position-x={0.003}
      position-y={-0.076}
      position-z={z}
    >
      <mesh geometry={nodes.Cube002.geometry} material={nodes.Cube002.material} />
      <mesh geometry={nodes.Cube002_1.geometry} material={nodes.Cube002_1.material} />
      <mesh geometry={nodes.Cube002_2.geometry} material={nodes.Cube002_2.material} />
      <mesh name='gpu-fan' ref={fan} geometry={nodes.gpu_fan.geometry} material={materials.light_metal} position={[0.07, 0.015, 0.001]} />
      {active && <Interface name='gpu' />}
    </a.group>
  )
}

export default GPU
