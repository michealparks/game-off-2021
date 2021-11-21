import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import Interface from './interface'
import { GLTFResult } from './constants'

const RAM = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'ram'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.04 : 0.04, config }, [active])

  return (
    <a.mesh
      onClick={() => send({ type: 'VIEW_MODULE', module: active ? null : 'ram' })}
      geometry={nodes.ram.geometry}
      material={materials.red}
      position-x={0.07}
      position-y={0.01}
      position-z={z}
    >
      {active && <Interface name='ram' />}
    </a.mesh>
  )
}

export default RAM
