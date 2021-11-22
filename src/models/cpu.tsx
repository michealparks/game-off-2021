import { useGame } from '../hooks/game'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { COMPUTER_URL, config, translateZ } from './constants'
import { GLTFResult } from './constants'
import Interface from './interface'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const CPU = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'cpu'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.037 : 0.037, config }, [active])
  const [{ z: cpuz }] = useSpring({ z: active ? 0.06 : 0.012, config }, [active])

  const fan = useRef<THREE.Mesh>(null!)

  useFrame(() => { fan.current.rotation.z += 0.1 })

  return (
    <>
      <a.mesh
        name='cpu'
        geometry={nodes.cpu.geometry}
        material={nodes.cpu.material}
        position-x={0.0}
        position-y={0.0}
        position-z={cpuz}
      />
      <a.group
        name='cpu-cooler'
        onClick={(e) => {
          e.stopPropagation()
          send({ type: 'VIEW_MODULE', module: active ? null : 'cpu' })
        }}
        position-x={0}
        position-y={0}
        position-z={z}
      >
        <mesh geometry={nodes.Cube011.geometry} material={nodes.Cube011.material} />
        <mesh geometry={nodes.Cube011_1.geometry} material={materials.sand} />
        <mesh name='cpu-fan' ref={fan} geometry={nodes.cpu_fan.geometry} material={materials.brown} position={[0, 0, 0.01]} />
        {active && <Interface name='cpu' />}
      </a.group>
    </>
  )
}

export default CPU
