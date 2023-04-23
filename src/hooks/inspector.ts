import * as THREE from 'three'
import * as React from 'react'
import { useThree } from '@react-three/fiber'
import Inspector from 'three-inspect'

export const useInspector = () => {
  const { scene, camera, gl } = useThree()

  const inspector = React.useMemo(() => new Inspector({
    THREE,
    scene,
    camera,
    renderer: gl,
    options: { location: 'overlay' }
  }), [])

  return inspector
}
