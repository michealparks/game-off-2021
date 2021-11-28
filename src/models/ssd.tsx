import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import Interface from './interface'
import { GLTFResult } from './constants'

const description = `
allows additional units to be built.
`

const SSD = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'ssd'
  const { nodes } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.016 : 0.016, config }, [active])

  return (
    <a.mesh
      name='ssd'
      castShadow
      onClick={(e) => {
        e.stopPropagation()
        send({ type: 'VIEW_MODULE', module: active ? null : 'ssd' })
      }}
      geometry={nodes.ssd.geometry}
      material={nodes.ssd.material}
      position-x={0}
      position-y={0.062}
      position-z={z}
    >
      {active && <Interface name='ssd' description={description} />}
    </a.mesh>
  )
}

export default SSD
