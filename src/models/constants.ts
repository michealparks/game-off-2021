import { GLTF } from 'three-stdlib'

export type GLTFResult = GLTF & {
  nodes: {
    motherboard: THREE.Mesh
    gpu: THREE.Mesh
    io: THREE.Mesh
    ['motherboard-gpu-io']: THREE.Mesh
    ['motherboard-cpu-io']: THREE.Mesh
    ram: THREE.Mesh
    cpu: THREE.Mesh
    ssd: THREE.Mesh
  }
  materials: {
    green: THREE.MeshStandardMaterial
    blue: THREE.MeshStandardMaterial
    white: THREE.MeshStandardMaterial
    red: THREE.MeshStandardMaterial
    sand: THREE.MeshStandardMaterial
  }
}

export const translateZ = 0.1

export const config = { mass: 1, tension: 1000, friction: 25, precision: 0.0001 }

export const COMPUTER_URL = new URL('../assets/computer.glb', import.meta.url).href
