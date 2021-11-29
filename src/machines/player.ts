import { createMachine, interpret, assign } from 'xstate'
import { computer } from './computer'
import { CONFIG, COST, Unit, Part, Resources } from './constants'

interface Context {
  elapsed: number
  elapsedCooldown: {
    harvester: number
    soldier: number
  }
  interval: number
  cooldown: number
  energy: number
  harvester: number
  soldier: number
  max: {
    harvester: number
    soldier: number
  }
}

type Events = 
  | { type: 'TICK' }
  | { type: 'START'; energy: number }
  | { type: 'CHANGE_SPEED'; amount: number }
  | { type: 'BUILD_UNIT'; unit: Unit }
  | { type: 'SEND_UNIT'; unit: Unit; part: Part }
  | { type: 'RECALL_UNIT'; unit: Unit; part: Part }

const formatFloat = (n: number): number => {
  return Number.parseFloat(n.toFixed(2))
}

const machine = createMachine<Context, Events>(
  {
    id: 'player',
    initial: 'idle',
    context: {
      elapsed: 0,
      elapsedCooldown: {
        harvester: 0,
        soldier: 0,
      },
      interval: 0,
      cooldown: 0,
      energy: 0,
      harvester: 0,
      soldier: 0,
      max: {
        harvester: 0,
        soldier: 0,
      },
    },
    states: {
      idle: {
        on: {
          START: {
            actions: 'start',
            target: 'running',
          },
        }
      },
      running: {
        invoke: { src: 'tick' },
        on: {
          TICK: {
            actions: 'process',
            target: 'running',
          },
          CHANGE_SPEED: {
            actions: 'changeSpeed'
          },
          SEND_UNIT: {
            actions: 'sendUnit',
            cond: 'canSendUnit',
          },
          RECALL_UNIT: {
            actions: 'recallUnit',
            cond: 'hasSentUnit',
          },
        }
      }
    }
  },
  {
    guards: {
      canSendUnit: (ctx, event) => (
        event.type === 'SEND_UNIT' &&
        ctx.energy >= COST[event.unit] &&
        ctx[event.unit] < ctx.max[event.unit]
      ),
      hasSentUnit: (_ctx, event) => (
        event.type === 'RECALL_UNIT' && computer.state.context[event.part][event.unit] >= 1
      ),
    },
    services: {
      tick: (ctx, _event) => (cb) => {
        const { interval } = ctx

        const id = setTimeout(cb, 1000 * interval, 'TICK')

        return () => clearTimeout(id)
      }
    },
    actions: {
      start: assign((_ctx, event) => {
        if (event.type !== 'START') return {}

        return {
          elapsed: 0,
          elapsedCooldown: {
            harvester: 0,
            soldier: 0,
          },
          interval: CONFIG.interval,
          cooldown: CONFIG.cooldown,
          energy: event.energy,
          harvester: 0,
          soldier: 0,
          max: {
            harvester: CONFIG.maxHarvester,
            soldier: CONFIG.maxSoldier,
          },
        }
      }),
      process: assign((ctx, _event) => {
        const { cpu, gpu, ram, ssd, psu } = computer.state.context
        const cpuWeight = -(cpu.harvester * CONFIG.cpuHarvesterLimiter)
        const ramWeight = -(1 + ram.harvester / 2)
        const psuWeight = (psu.harvester * CONFIG.psuHarvesterLimiter)
        const ssdWeight = (ssd.harvester * CONFIG.ssdHarvesterBonus)
        const gpuBonus = gpu.harvester === 0 ? 0 : Math.random() * Math.max(5, 200 - gpu.harvester * 2) < 1 ? 10 : 0

        return {
          elapsed: ctx.elapsed + 1,
          interval: Math.max(CONFIG.minInterval, CONFIG.interval + cpuWeight),
          cooldown: CONFIG.cooldown,
          energy: formatFloat(ctx.energy + psuWeight + gpuBonus),
          max: {
            harvester: CONFIG.maxHarvester + ssdWeight,
            soldier: CONFIG.maxHarvester + ssdWeight,
          },
          elapsedCooldown: {
            harvester: Math.max(0, ctx.elapsedCooldown.harvester + ramWeight),
            soldier: Math.max(0, ctx.elapsedCooldown.soldier + ramWeight),
          },
        }
      }),
      changeSpeed: assign((ctx, event) => {
        if (event.type !== 'CHANGE_SPEED') return {}

        return { interval: ctx.interval + event.amount }
      }),
      sendUnit: assign((ctx, event) => {
        if (event.type !== 'SEND_UNIT') return {}

        const { unit, part } = event

        computer.send({ type: 'SEND_UNIT', unit, part })

        return {
          [unit]: ctx[unit] + 1,
          energy: formatFloat(ctx.energy - COST[unit]),
          elapsedCooldown: {
            ...ctx.elapsedCooldown,
            [unit]: CONFIG.cooldown,
          }
        }
      }),
      recallUnit: assign((ctx, event) => {
        if (event.type !== 'RECALL_UNIT') return {}

        const { unit, part } = event

        computer.send({ type: 'RECALL_UNIT', unit, part })

        return {
          [unit]: ctx[unit] - 1,
          energy: formatFloat(ctx.energy + COST[unit]),
          elapsedCooldown: {
            ...ctx.elapsedCooldown,
            [unit]: CONFIG.cooldown,
          }
        }
      }),
    }
  }
)

export const player = interpret(machine)

player.start()
