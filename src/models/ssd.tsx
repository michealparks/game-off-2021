import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useGame } from '../hooks/game'
import { COMPUTER_URL, config, translateZ } from './constants'
import Interface from './interface'
import { GLTFResult } from './constants'
import { audio } from '../util/audio'
import { useReflection } from '../hooks/reflection'

const description = `
allows additional units to be built.
`

const SSD = () => {
  const [state, send] = useGame()
  const active = state.context.viewedModule === 'ssd'
  const { nodes } = useGLTF(COMPUTER_URL) as GLTFResult
  const [{ z }] = useSpring({ z: active ? translateZ + 0.016 : 0.016, config }, [active])

  const material = nodes.ssd.material as THREE.MeshStandardMaterial
  const envMap = useReflection()

  material.metalness = 0.9
  material.roughness = 0.02
  material.envMap = envMap
  material.envMapIntensity = 0.3

  return (
    <a.mesh
      name='ssd'
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation()
        if (state.context.viewedModule !== null) audio.play('attach', 50)
        audio.play(active ? 'attach' : 'remove', active ? 50 : 0)
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
