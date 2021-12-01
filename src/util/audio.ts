import * as THREE from 'three'

export const listener = new THREE.AudioListener()

const audioLoader = new THREE.AudioLoader()
const sounds = new Map<string, THREE.Audio>()
const lowPassFilter = listener.context.createBiquadFilter()
lowPassFilter.type = 'lowpass'

const create = async (key: string, url: string) => {
  const buffer = await audioLoader.loadAsync(url)
  const sound = new THREE.Audio(listener)
  sound.setBuffer(buffer)
  sound.setLoop(false)
	sound.setVolume(0.5)
  sounds.set(key, sound)
}

export const play = (key: string, delay = 0) => {
  if (delay > 0) {
    return setTimeout(play, delay, key)
  }

  const sound = sounds.get(key)!

  if (sound.isPlaying) {
    sound.stop()
  }

  sound.play()
}

export const stop = (key: string) => {
  const sound = sounds.get(key)!
  sound.stop()
}

export const loop = (key: string) => {
  const sound = sounds.get(key)!
  sound.setLoop(true)
  sound.play()
}

export const volume = (key: string, val: number) => {
  sounds.get(key)!.setVolume(val)
}

export const toggleLowPassFilter = (key: string, on: boolean) => {
  const sound = sounds.get(key)!

  if (on === false) {
    lowPassFilter.frequency.setTargetAtTime(15_000, listener.context.currentTime, 0)
  } else {
    lowPassFilter.frequency.setTargetAtTime(500, listener.context.currentTime, 0)
    sound.setFilter(lowPassFilter)
  }
}

export const audio = { create, play, stop, loop, volume, toggleLowPassFilter }
