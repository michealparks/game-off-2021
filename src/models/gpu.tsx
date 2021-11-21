import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import { GLTFResult } from './constants'
import Interface from './interface'

const GPU = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'gpu'
  const { nodes } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.06 : 0.06, config }, [active])

  return (
    <a.mesh
      onClick={() => send({ type: 'VIEW_MODULE', module: active ? null : 'gpu' })}
      geometry={nodes.gpu.geometry}
      material={nodes.gpu.material}
      position-x={0}
      position-y={-0.08}
      position-z={z}
    >
      {active && <Interface name='gpu' />}
    </a.mesh>
  )
}

export default GPU
