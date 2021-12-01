import { interpret, createMachine, assign } from 'xstate'
import { Part } from './constants'

interface Context {
  viewedModule: null | Part
  conclusion: null | {
    status: 'win' | 'lose'
  }
}

type Events =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'UNPAUSE' }
  | { type: 'END_GAME' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'VIEW_MODULE'; module: null | Part }

const machine = createMachine<Context, Events>(
  {
    id: 'game',
    initial: 'idle',
    context: {
      conclusion: null,
      viewedModule: null,
    },
    states: {
      idle: {
        on: {
          START: 'running'
        },
      },
      running: {
        on: {
          PAUSE: 'paused',
          END_GAME: 'ended',
          VIEW_MODULE: {
            actions: 'setViewedModule',
          },
        },
      },
      paused: {
        on: {
          UNPAUSE: 'running',
        },
      },
      ended: {
        on: {
          START: {
            target: 'running',
            actions: 'start'
          },
        },
      },
    },
  },
  {
    actions: {
      setViewedModule: assign((_ctx, event) => {
        if (event.type !== 'VIEW_MODULE') return {}

        return { viewedModule: event.module }
      }),
    },
  }
)

export const game = interpret(machine)

game.start()
