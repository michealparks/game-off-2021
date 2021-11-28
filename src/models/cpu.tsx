import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import { GLTFResult } from './constants'
import Interface from './interface'
import { player } from '../machines/player'
import { audio } from '../util/audio'

const description = `
Speeds up the game clock for the virus.
`

const handlePartClick = (part: string) => (e) => {

}

const CPU = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'cpu'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.037 : 0.037, config }, [active])
  const [{ z: cpuz }] = useSpring({ z: active ? 0.06 : 0.012, config }, [active])

  const fan = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    fan.current.rotation.z += (0.01 + (1 / player.state.context.interval * 0.01))
  })

  return (
    <>
      <a.mesh
        castShadow
        receiveShadow
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
          if (active) {
            audio.play('attach')
            send({ type: 'VIEW_MODULE', module: null })
          } else {
            audio.play('remove')
            send({ type: 'VIEW_MODULE', module: 'cpu' })
          }
          
        }}
        position-x={0}
        position-y={0}
        position-z={z}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={nodes.Cube011.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_1.geometry}
          material={materials.sand}
        />
        <mesh
          name='cpu-fan'
          castShadow
          receiveShadow
          ref={fan}
          geometry={nodes.cpu_fan.geometry}
          material={materials.brown}
          position={[0, 0, 0.01]}
        />
        {active && <Interface name='cpu' description={description} />}
      </a.group>
    </>
  )
}

export default CPU
