import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { listener } from './util/audio'

const Effects = () => {
  const { camera } = useThree()

  useEffect(() => {
    camera.add(listener)
  }, [camera])

  return (
    <EffectComposer multisampling={8}>
      <Bloom
        intensity={0.7} // The bloom intensity.
        height={200} // render height
        luminanceThreshold={0.4} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.9} // smoothness of the luminance threshold. Range is [0, 1]
      />
      <Noise opacity={0.06} />
      <Vignette eskil={false} offset={0} darkness={1.3} />
    </EffectComposer>
  )
}

export default Effects
