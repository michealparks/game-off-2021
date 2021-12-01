import { useActor } from '@xstate/react'
import { ai } from '../machines/ai'

export const useAi = () => useActor(ai)
