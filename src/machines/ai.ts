import { createMachine } from 'xstate'

interface Context {}

type Events = 
  | { type: 'START' }

export const aiMachine = createMachine<Context, Events>(
  {
    id: 'ai',
    initial: 'idle',
    context: {},
    states: {
      idle: {
        on: {
          START: 'running'
        }
      },
      running: {
        on: {
          
        }
      }
    }
  }
)