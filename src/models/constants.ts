import { GLTF } from 'three-stdlib'

export type GLTFResult = GLTF & {
  nodes: {
    motherboard: THREE.Mesh
    Cube002: THREE.Mesh
    Cube002_1: THREE.Mesh
    Cube002_2: THREE.Mesh
    io: THREE.Mesh
    motherboard_gpu_io: THREE.Mesh
    motherboard_cpu_io: THREE.Mesh
    Cube009: THREE.Mesh
    Cube009_1: THREE.Mesh
    Cube009_2: THREE.Mesh
    Cube011: THREE.Mesh
    Cube011_1: THREE.Mesh
    ssd: THREE.Mesh
    cpu: THREE.Mesh
    ram_io: THREE.Mesh
    gpu_fan: THREE.Mesh
    cpu_fan: THREE.Mesh
    psu: THREE.Mesh
  }
  materials: {
    green: THREE.MeshStandardMaterial
    blue: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
    gold: THREE.MeshStandardMaterial
    white: THREE.MeshStandardMaterial
    red: THREE.MeshStandardMaterial
    sand: THREE.MeshStandardMaterial
    light_metal: THREE.MeshStandardMaterial
    brown: THREE.MeshStandardMaterial
  }
}

export const translateZ = 0.1

export const config = { mass: 1, tension: 1000, friction: 25, precision: 0.0001 }

export const COMPUTER_URL = new URL('../assets/computer.glb', import.meta.url).href
