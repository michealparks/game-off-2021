import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { config, translateZ } from './constants'
import Interface from './interface'
import { GLTFResult } from './constants'

const SSD = () => {
  const [state, send] = useGame()
  const { viewedModule, allocations } = state.context
  const active = viewedModule === 'ssd'
  const { nodes } = useGLTF('./static/computer.glb') as GLTFResult
  const [{ z }] = useSpring({ z: viewedModule === 'ssd' ? translateZ + 0.02 : 0.02, config }, [viewedModule])
  const toggle = () => send({ type: 'VIEW_MODULE', module: active ? null : 'ssd' })

  return (
    <a.mesh
      onClick={toggle}
      geometry={nodes.ssd.geometry}
      material={nodes.ssd.material}
      position-x={0}
      position-y={0.06}
      position-z={z}
    >
      {active && <Interface
        name='ssd'
        harvesters={allocations.harvester.ssd}
        soldiers={allocations.soldier.ssd}
        onClose={toggle}
      />}
    </a.mesh>
  )
}

export default SSD
