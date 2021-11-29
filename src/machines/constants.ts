export const CONFIG = {
  minInterval: 0.1,
  interval: 0.5,
  cooldown: 7,
  maxHarvester: 10,
  maxSoldier: 10,
  ssdHarvesterBonus: 2,
  cpuHarvesterLimiter: 0.01,
  psuHarvesterLimiter: 0.05,
}

export const COST = {
  harvester: 5,
  soldier: 10
}

export type Unit = 'harvester' | 'soldier'
export type AiUnit = 'defender'
export type Part = 'cpu' | 'gpu' | 'ram' | 'ssd' | 'psu'

export interface Resources {
  energy: number
  harvester: number
  soldier: number
}
