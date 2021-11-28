import { useRef } from 'react'
import { Merged, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import { GLTFResult } from './constants'
import Interface from './interface'
import { player } from '../machines/player'
import { audio } from '../util/audio'

const description = `
Creates a greater chance every clock tick that a random unit will be generated.
`

const GPU = () => {
  const startZ = 0.061
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'gpu'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + startZ : startZ, config }, [active])

  const fan = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    fan.current.rotation.y += 0.01 + (1 / player.state.context.interval)
  })

  return (
    <a.group
      name='gpu'
      onClick={(e) => {
        e.stopPropagation()
        audio.play(active ? 'attach' : 'remove')
        send({ type: 'VIEW_MODULE', module: active ? null : 'gpu' })
      }}
      position-x={0.003}
      position-y={-0.076}
      position-z={z}
    >
      <Merged castShadow receiveShadow meshes={[nodes.Cube002, nodes.Cube002_1, nodes.Cube002_2]}>
        {/* @ts-ignore */}
        {(Node1, Node2, Node3) => (
          <>
            <Node1 material={nodes.Cube002.material} />
            <Node2 material={nodes.Cube002_1.material} />
            <Node3 material={nodes.Cube002_2.material} />
          </>
        )}
      </Merged>
      
      <mesh
        castShadow
        receiveShadow
        name='gpu-fan' ref={fan} geometry={nodes.gpu_fan.geometry} material={materials.light_metal} position={[0.0675, 0.015, 0.001]} />
      {active && <Interface name='gpu' description={description} />}
    </a.group>
  )
}

export default GPU
