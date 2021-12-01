import { createMachine, interpret, assign } from 'xstate'
import { Unit, AiUnit, Part, CONFIG } from './constants'
import { game } from './game'

interface Context {
  control: number,
  cpu: {
    control: number,
    harvester: number
    soldier: number
    defender: number
  }
  gpu: {
    control: number,
    harvester: number
    soldier: number
    defender: number
  }
  ram: {
    control: number,
    harvester: number
    soldier: number
    defender: number
  }
  ssd: {
    control: number
    harvester: number
    soldier: number
    defender: number
  }
  psu: {
    control: number
    harvester: number
    soldier: number
    defender: number
  }
}

type Events = 
  | { type: 'SEND_UNIT'; unit: Unit | AiUnit; part: Part }
  | { type: 'RECALL_UNIT'; unit: Unit | AiUnit; part: Part }
  | { type: 'KILL_UNIT'; unit: Unit | AiUnit; part: Part }

const machine = createMachine<Context, Events>(
  {
    id: 'computer',
    initial: 'running',
    context: {
      control: 0,
      cpu: { control: 0, harvester: 0, soldier: 0, defender: 0 },
      gpu: { control: 0, harvester: 0, soldier: 0, defender: 0 },
      ram: { control: 0, harvester: 0, soldier: 0, defender: 0 },
      ssd: { control: 0, harvester: 0, soldier: 0, defender: 0 },
      psu: { control: 0, harvester: 0, soldier: 0, defender: 0 },
    },
    states: {
      running: {
        on: {
          SEND_UNIT: {
            actions: ['updateUnits', 'process']
          },
          RECALL_UNIT: {
            actions: ['updateUnits', 'process']
          },
          KILL_UNIT: {
            actions: ['updateUnits', 'process']
          }
        }
      }
    }
  },
  {
    actions: {
      updateUnits: assign((ctx, event) => {
        const { part, unit } = event
        const inc = event.type === 'SEND_UNIT' ? 1 : -1

        return {
          [part]: {
            ...ctx[part],
            [unit]: ctx[part][unit] + inc
          }
        }
      }),
      process: assign((ctx, event) => {
        const { part } = event
        const partControl = (ctx[part].harvester + ctx[part].soldier) / CONFIG.unitsToControl
        
        let control = 0

        ctx[part].control = partControl
        control += ctx.cpu.control
        control += ctx.gpu.control
        control += ctx.ram.control
        control += ctx.ssd.control
        control += ctx.psu.control

        if (control >= 1) {
          game.send({ type: 'END_GAME' })
        }

        return {
          control,
          [part]: {
            ...ctx[part],
            control: partControl
          }
        }
      }),
    }
  }
)

export const computer = interpret(machine)

computer.start()
