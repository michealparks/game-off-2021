import { useGame } from '../hooks/game'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { COMPUTER_URL, config, translateZ } from './constants'
import { GLTFResult } from './constants'
import Interface from './interface'

const CPU = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'cpu'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.02 : 0.02, config }, [active])

  return (
    <a.mesh
      onClick={() => send({ type: 'VIEW_MODULE', module: active ? null : 'cpu' })}
      geometry={nodes.cpu.geometry}
      material={materials.sand}
      position-x={0}
      position-y={0}
      position-z={z}
    >
      {active && <Interface name='cpu' />}
    </a.mesh>
  )
}

export default CPU
