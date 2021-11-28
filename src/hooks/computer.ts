import { useActor } from '@xstate/react'
import { computer } from '../machines/computer'

export const useComputer = () => useActor(computer)
