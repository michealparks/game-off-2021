import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

export const useReflection = () => {
  const { scene, gl } = useThree()

  const near = 0.1
  const far = 2500
  const size = 512
  const target = useMemo(() => new THREE.WebGLCubeRenderTarget(size, {
    anisotropy: gl.capabilities.getMaxAnisotropy() ?? 1,
    stencilBuffer: false,
    depthBuffer: false,
  }), [])

  const camera = useMemo(() => new THREE.CubeCamera(near, far, target), [])
  camera.name = 'Reflection Camera'
  scene.add(camera)
  camera.position.set(0, 0, -0.09)

  useEffect(() => {
    setInterval(() => {
      camera.update(gl, scene)
    }, 1000 / 20)
  }, [])

  return target.texture
}
