import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'
import { listener } from './util/audio'
import { useComputer } from './hooks/computer'
import { lerp } from 'three/src/math/MathUtils'

const Effects = () => {
  const { camera } = useThree()
  const [computer] = useComputer()
  const { control } = computer.context

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
      <Glitch
        delay={[lerp(4, 0.1, (control - 0.5) * 2), lerp(5, 0.2, (control - 0.5) * 2)]} // min and max glitch delay
        duration={[0.6, 1.0]} // min and max glitch duration
        strength={[0.05, 0.5]} // min and max glitch strength
        mode={GlitchMode.SPORADIC} // glitch mode
        active={control > 0.5} // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
      />
    </EffectComposer>
  )
}

export default Effects
