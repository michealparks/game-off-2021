import { useActor } from '@xstate/react'
import { useEffect } from 'react'
import { player } from '../machines/player'

export const usePlayer = () => useActor(player)
