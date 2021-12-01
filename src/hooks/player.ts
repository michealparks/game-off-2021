import { useActor } from '@xstate/react'
import { player } from '../machines/player'

export const usePlayer = () => useActor(player)
