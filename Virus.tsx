/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.Mesh
    Leg1: THREE.SkinnedMesh
    Leg4: THREE.SkinnedMesh
    Leg2: THREE.SkinnedMesh
    Leg3: THREE.SkinnedMesh
    Bone01: THREE.Bone
    Bone002: THREE.Bone
    Bone01_1: THREE.Bone
    Bone01_2: THREE.Bone
    Bone01_3: THREE.Bone
  }
  materials: {}
}

type ActionName = 'Action' | 'Action.001'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('./src/assets/virus.glb') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  console.log(actions)

  useEffect(() => {
    actions['Action'].play()
    actions['Action.001'].play()
  })

  return (
    <group scale={0.01} position-z={0.1} ref={group} {...props} dispose={null}>
      <mesh
        name="Body"
        castShadow
        receiveShadow
        geometry={nodes.Body.geometry}
        material={nodes.Body.material}
        position={[0.143, 1.859, -0.332]}>
        <group name="Leg1_Armature" position={[-0.015, -2.318, 0]} rotation={[0, 0, -1.232]}>
          <primitive object={nodes.Bone01} />
          <primitive object={nodes.Bone002} />
        </group>
        <group name="Leg2_Armature" position={[-0.071, -2.318, -0.095]} rotation={[1.232, -Math.PI / 2, 0]}>
          <primitive object={nodes.Bone01_1} />
        </group>
        <group name="Leg3_Armature" position={[0.135, -2.318, 0]} rotation={[Math.PI, 0, 1.909]}>
          <primitive object={nodes.Bone01_2} />
        </group>
        <group name="Leg4_Armature" position={[-0.052, -2.318, 0.127]} rotation={[-1.232, Math.PI / 2, 0]}>
          <primitive object={nodes.Bone01_3} />
        </group>
        <skinnedMesh
          name="Leg1"
          geometry={nodes.Leg1.geometry}
          material={nodes.Leg1.material}
          skeleton={nodes.Leg1.skeleton}
        />
        <skinnedMesh
          name="Leg4"
          geometry={nodes.Leg4.geometry}
          material={nodes.Leg4.material}
          skeleton={nodes.Leg4.skeleton}
        />
        <skinnedMesh
          name="Leg2"
          geometry={nodes.Leg2.geometry}
          material={nodes.Leg2.material}
          skeleton={nodes.Leg2.skeleton}
        />
        <skinnedMesh
          name="Leg3"
          geometry={nodes.Leg3.geometry}
          material={nodes.Leg3.material}
          skeleton={nodes.Leg3.skeleton}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/virus.glb')