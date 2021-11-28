import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import Interface from './interface'
import { GLTFResult } from './constants'

const description = `
Causes additional energy to be redistributed to the virus.
`

const PSU = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'psu'
  const { nodes } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.04 : 0.04, config }, [active])

  return (
    <a.mesh
      name='psu'
      castShadow
      onClick={(e) => {
        e.stopPropagation()
        send({ type: 'VIEW_MODULE', module: active ? null : 'psu' })
      }}
      geometry={nodes.psu.geometry}
      material={nodes.psu.material}
      position-x={0.002}
      position-y={0.159}
      position-z={z}
    >
      {active && <Interface name='psu' description={description} />}
    </a.mesh>
  )
}

export default PSU
