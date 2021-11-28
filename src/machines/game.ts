import { interpret, createMachine, assign } from 'xstate'
import { Unit, Part, Resources } from './constants'
import { player } from './player'

interface Context {
  viewedModule: null | Part
}

type Events =
  | { type: 'START'; resources: Resources }
  | { type: 'RESUME'; context: Context }
  | { type: 'PAUSE' }
  | { type: 'END_GAME' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'VIEW_MODULE'; module: null | Part }

const machine = createMachine<Context, Events>(
  {
    id: 'game',
    initial: 'idle',
    context: {
      viewedModule: null,
    },
    states: {
      idle: {
        on: {
          START: {
            target: 'running',
            actions: 'start',
          },
          RESUME: {
            target: 'running',
            actions: 'resume'
          }
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
          START: 'running',
        },
      },
      ended: {
        on: {
          RESET: {
            target: 'idle',
            actions: 'reset'
          },
        },
      },
    },
  },
  {
    actions: {
      start: assign((_ctx, event) => {
        if (event.type !== 'START') return {}

        player.send({ type: 'START', resources: event.resources })

        return {}
      }),
      reset: assign((_ctx, event) => {
        if (event.type !== 'END_GAME') return {}

        player.send({
          type: 'START',
          resources: {
            energy: 0,
            harvester: 0,
            soldier: 0,
          }
        })

        return {
          viewedModule: null,
        }
      }),
      setViewedModule: assign((_ctx, event) => {
        if (event.type !== 'VIEW_MODULE') return {}

        return { viewedModule: event.module }
      }),
    },
  }
)

export const game = interpret(machine)

game.start()
