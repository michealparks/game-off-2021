import { useActor } from '@xstate/react'
import { message } from '../machines/message'

export const useMessage = () => useActor(message)
