import { EffectComposer, Bloom, Noise, Vignette, SSAO } from '@react-three/postprocessing'
import { ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const Effects = () => {
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
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // blend mode
        samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
        rings={30} // amount of rings in the occlusion sampling pattern
        distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
        distanceFalloff={0.1} // distance falloff. min: 0, max: 1
        rangeThreshold={1.0} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
        rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
        luminanceInfluence={0.1} // how much the luminance of the scene influences the ambient occlusion
        radius={2} // occlusion sampling radius
        scale={0.2} // scale of the ambient occlusion
        bias={0.035} // occlusion bias
      />

    </EffectComposer>
  )
}

export default Effects
