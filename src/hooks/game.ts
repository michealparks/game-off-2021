import { useActor } from '@xstate/react'
import { useEffect } from 'react'
import { game } from '../machines/game'

export const useGame = () => {
  useEffect(() => { game.start() }, [])
  return useActor(game)
}
