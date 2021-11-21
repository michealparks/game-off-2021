import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import Interface from './interface'
import { GLTFResult } from './constants'

const RAM = () => {
  const [state, send] = useGame()
  const { viewedModule, allocations } = state.context
  const active = viewedModule === 'ram'
  const { nodes, materials } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: viewedModule === 'ram' ? translateZ + 0.04 : 0.04, config }, [viewedModule])
  const toggle = () => send({ type: 'VIEW_MODULE', module: active ? null : 'ram' })

  return (
    <a.mesh
      onClick={toggle}
      geometry={nodes.ram.geometry}
      material={materials.red}
      position-x={0.07}
      position-y={0.01}
      position-z={z}
    >
      {active && <Interface
        name='ram'
        harvesters={allocations.harvester.ram}
        soldiers={allocations.soldier.ram}
        onClose={toggle}
      />}
    </a.mesh>
  )
}

export default RAM
