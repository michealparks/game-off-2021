import * as THREE from 'three'

export const listener = new THREE.AudioListener()

const audioLoader = new THREE.AudioLoader()
const sounds = new Map<string, THREE.Audio>()

const create = async (key: string, url: string) => {
  const buffer = await audioLoader.loadAsync(url)
  const sound = new THREE.Audio(listener)
  sound.setBuffer(buffer)
  sound.setLoop(false)
	sound.setVolume(0.5)
  sounds.set(key, sound)
}

export const play = (key: string) => {
  sounds.get(key)!.play()
}

export const loop = (key: string) => {
  const sound = sounds.get(key)!
  sound.setLoop(true)
  sound.play()
}

export const volume = (key: string, val: number) => {
  sounds.get(key)!.setVolume(val)
}

export const audio = { create, play, loop, volume }
