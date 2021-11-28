import { useActor } from '@xstate/react'
import { game } from '../machines/game'

export const useGame = () => useActor(game)
