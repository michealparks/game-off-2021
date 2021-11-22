import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useGLTF, shaderMaterial } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import Interface from './interface'
import { GLTFResult } from './constants'
import vertShader from '../shaders/ram.vert.glsl'
import fragShader from '../shaders/ram.frag.glsl'
import { useRef } from 'react'

console.log(vertShader)

const RamMaterial = shaderMaterial(
  { time: 0 },
  vertShader,
  fragShader,
)

extend({ RamMaterial })

const RAM = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'ram'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.047 : 0.047, config }, [active])

  const matRef = useRef<THREE.ShaderMaterial>(null!)

  useFrame(() => (matRef.current.uniforms.time.value += 0.01))

  return (
    <a.group
      onClick={(e) => {
        e.stopPropagation()
        send({ type: 'VIEW_MODULE', module: active ? null : 'ram' })
      }}
      position-x={0.068}
      position-y={0.013}
      position-z={z}
    >
      <mesh geometry={nodes.Cube009.geometry} material={nodes.Cube009.material} />
      <mesh geometry={nodes.Cube009_1.geometry} material={nodes.Cube009_1.material} />
      <mesh geometry={nodes.Cube009_2.geometry} material={materials.red}>
        <ramMaterial ref={matRef} attach="material" color="hotpink" />
      </mesh>
      {active && <Interface name='ram' />}
    </a.group>
  )
}

export default RAM
