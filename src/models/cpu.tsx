import { useGame } from '../hooks/game'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { COMPUTER_URL, config, translateZ } from './constants'
import { GLTFResult } from './constants'
import Interface from './interface'

const CPU = () => {
  const [state, send] = useGame()
  const { viewedModule, allocations } = state.context
  const active = viewedModule === 'cpu'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.02 : 0.02, config }, [viewedModule])
  const toggle = () => send({ type: 'VIEW_MODULE', module: active ? null : 'cpu' })

  return (
    <a.mesh
      onClick={toggle}
      geometry={nodes.cpu.geometry}
      material={materials.sand}
      position-x={0}
      position-y={0}
      position-z={z}
    >
      {active && <Interface
        name='cpu'
        harvesters={allocations.harvester.cpu}
        soldiers={allocations.soldier.cpu}
        onClose={toggle}
      />}
    </a.mesh>
  )
}

export default CPU
