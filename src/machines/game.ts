import { interpret, createMachine, assign } from 'xstate'
import { UNIT } from './constants'

export type Module = 'cpu' | 'gpu' | 'ram' | 'ssd' | 'psu'

type Unit = 'harvester' | 'soldier'

interface GameState {
  viewedModule: null | Module
  allocations: {
    harvester: {
      cpu: number
      gpu: number
      ram: number
      ssd: number
      psu: number
    }
    soldier: {
      cpu: number
      gpu: number
      ram: number
      ssd: number
      psu: number
    }
  }
}

interface Resources {
  energy: number
  harvester: number
  soldier: number
}

interface Context extends Resources, GameState {
  energy: number
}

interface Allocation {
  type: Unit
  amount: number
  module: Module
}

type Events =
  | { type: 'START'; resources: Resources }
  | { type: 'RESUME'; context: Context }
  | { type: 'PAUSE' }
  | { type: 'END_GAME' }
  | { type: 'RESET' }
  | { type: 'VIEW_MODULE'; module: null | Module }
  | { type: 'BUILD_UNIT'; unit: Unit }
  | { type: 'ALLOCATE_UNITS'; allocation: Allocation }
  | { type: 'KILL_UNITS'; allocation: Allocation }

export const gameMachine = createMachine<Context, Events>(
  {
    id: 'game',
    initial: 'idle',
    context: {
      energy: 0,
      harvester: 0,
      soldier: 0,
      viewedModule: null,
      allocations: {
        harvester: { cpu: 0, gpu: 0, ram: 0, ssd: 0, psu: 0 },
        soldier: { cpu: 0, gpu: 0, ram: 0, ssd: 0, psu: 0 },
      }
    },
    states: {
      idle: {
        on: {
          START: {
            target: 'running',
            actions: 'setResources',
          },
          RESUME: {
            target: 'running',
            actions: 'setContext'
          }
        },
      },
      running: {
        on: {
          PAUSE: 'paused',
          END_GAME: 'ended',
          VIEW_MODULE: {
            target: 'running',
            actions: 'setViewedModule',
          },
          BUILD_UNIT: {
            target: 'running',
            actions: 'buildUnit',
          },
          ALLOCATE_UNITS: {
            target: 'running',
            actions: 'setAllocatedUnits',
          },
          KILL_UNITS: {
            target: 'running',
            actions: 'setAllocatedUnits',
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
            actions: 'resetContext'
          },
        },
      },
    },
  },
  {
    actions: {
      setResources: assign((_ctx, event) => {
        if (event.type !== 'START') return {}

        return event.resources
      }),
      setAllocatedUnits: assign((ctx, event) => {
        if (event.type === 'ALLOCATE_UNITS') {
          const { allocation } = event
          ctx.allocations[allocation.type][allocation.module] += allocation.amount
          return ctx.allocations
        }

        if (event.type === 'KILL_UNITS') {
          const { allocation } = event
          ctx.allocations[allocation.type][allocation.module] -= allocation.amount
        }

        return {}
      }),
      setViewedModule: assign((_ctx, event) => {
        if (event.type !== 'VIEW_MODULE') return {}

        return { viewedModule: event.module }
      }),
      resetContext: assign((_ctx, event) => {
        if (event.type !== 'END_GAME') return {}

        return {
          energy: 0,
          harvester: 0,
          soldier: 0,
          viewedModule: null,
          allocations: {
            harvester: { cpu: 0, gpu: 0, ram: 0, ssd: 0, psu: 0 },
            soldier: { cpu: 0, gpu: 0, ram: 0, ssd: 0, psu: 0 },
          }
        }
      }),
      setContext: assign((_ctx, event) => {
        if (event.type !== 'RESUME') return {}

        return event.context
      }),
      buildUnit: assign((ctx, event) => {
        if (event.type !== 'BUILD_UNIT') return {}

        const { unit } = event

        return {
          energy: ctx.energy - UNIT[unit].cost,
          [unit]: ctx[unit] + 1,
        }
      })
    },
  }
)

export const game = interpret(gameMachine)
