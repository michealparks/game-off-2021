import { interpret, createMachine, assign } from 'xstate'
import { UNIT } from './constants'

export type Module = 'cpu' | 'gpu' | 'ram' | 'ssd' | 'psu'

type Unit = 'harvester' | 'soldier'

interface GameState {
  elapsed: number
  tickInterval: number
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

interface Context extends Resources, GameState {}

type Events =
  | { type: 'START'; resources: Resources }
  | { type: 'RESUME'; context: Context }
  | { type: 'PAUSE' }
  | { type: 'END_GAME' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'VIEW_MODULE'; module: null | Module }
  | { type: 'BUILD_UNIT'; unit: Unit }
  | { type: 'ALLOCATE_UNIT'; unit: Unit; part: Module }
  | { type: 'RECALL_UNIT'; unit: Unit; part: Module }
  | { type: 'KILL_UNIT'; unit: Unit; part: Module }

export const gameMachine = createMachine<Context, Events>(
  {
    id: 'game',
    initial: 'idle',
    context: {
      elapsed: 0,
      tickInterval: 1.0,
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
        invoke: {
          src: 'spawnTick',
        },
        on: {
          PAUSE: 'paused',
          END_GAME: 'ended',
          TICK: {
            actions: 'processGame',
          },
          VIEW_MODULE: {
            actions: 'setViewedModule',
          },
          BUILD_UNIT: {
            actions: 'buildUnit',
            cond: 'hasEnergyForUnit',
          },
          ALLOCATE_UNIT: {
            actions: 'allocateUnit',
            cond: 'hasUnit',
          },
          RECALL_UNIT: {
            actions: 'recallUnit',
            cond: 'hasAllocatedUnits',
          },
          KILL_UNIT: {
            actions: 'killUnit',
            cond: 'hasAllocatedUnits',
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
    guards: {
      hasUnit: (ctx, event) => (
        event.type === 'ALLOCATE_UNIT' && ctx[event.unit] > 0
      ),
      hasEnergyForUnit: (ctx, event) => (
        event.type === 'BUILD_UNIT' && ctx.energy >= UNIT[event.unit].cost
      ),
      hasAllocatedUnits: (ctx, event) => (
        (event.type === 'KILL_UNIT' || event.type === 'RECALL_UNIT') && ctx.allocations[event.unit][event.part] >= 1
      ),
    },
    services: {
      spawnTick: ({ tickInterval }) => (cb) => {
        const interval = setInterval(() => cb('TICK'), 1000 * tickInterval)

        return () => clearInterval(interval)
      },
    },
    actions: {
      setResources: assign((_ctx, event) => {
        if (event.type !== 'START') return {}

        return event.resources
      }),

      buildUnit: assign((ctx, event) => {
        if (event.type !== 'BUILD_UNIT') return {}

        const { unit } = event

        return {
          energy: ctx.energy - UNIT[unit].cost,
          [unit]: ctx[unit] + 1,
        }
      }),

      allocateUnit: assign((ctx, event) => {
        if (event.type !== 'ALLOCATE_UNIT') return {}

        const { unit, part } = event
        const allocations = JSON.parse(JSON.stringify(ctx.allocations))
        allocations[unit][part] += 1

        return {
          [unit]: ctx[unit] - 1,
          allocations,
        }
      }),

      recallUnit: assign((ctx, event) => {
        if (event.type !== 'RECALL_UNIT') return {}

        const { unit, part } = event
        const allocations = JSON.parse(JSON.stringify(ctx.allocations))
        allocations[unit][part] -= 1

        return {
          [unit]: ctx[unit] + 1,
          allocations,
        }
      }),

      killUnit: assign((ctx, event) => {
        if (event.type !== 'KILL_UNIT') return {}

        const allocations = JSON.parse(JSON.stringify(ctx.allocations))
        allocations[event.unit][event.part] -= 1

        return { allocations }
      }),

      processGame: assign((ctx, event) => {
        return {
          elapsed: ctx.elapsed + ctx.tickInterval
        }
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
    },
  }
)

export const game = interpret(gameMachine)
