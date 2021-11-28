import { EffectComposer, Bloom, Noise, Vignette, SSAO } from '@react-three/postprocessing'
import { ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const Effects = () => {
  return (
    <EffectComposer multisampling={8}>
      <Bloom
        intensity={0.9} // The bloom intensity.
        height={300} // render height
        luminanceThreshold={0.4} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.9} // smoothness of the luminance threshold. Range is [0, 1]
      />
      <Noise opacity={0.1} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // blend mode
        samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
        rings={4} // amount of rings in the occlusion sampling pattern
        distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
        distanceFalloff={0.0} // distance falloff. min: 0, max: 1
        rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
        rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
        luminanceInfluence={0} // how much the luminance of the scene influences the ambient occlusion
        radius={20} // occlusion sampling radius
        scale={1} // scale of the ambient occlusion
        bias={0.035} // occlusion bias
      />

    </EffectComposer>
  )
}

export default Effects
