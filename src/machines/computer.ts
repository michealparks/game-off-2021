import { createMachine, interpret, assign } from 'xstate'
import { Unit, AiUnit, Part } from './constants'

interface Context {
  cpu: {
    harvester: number
    soldier: number
    defender: number
  }
  gpu: {
    harvester: number
    soldier: number
    defender: number
  }
  ram: {
    harvester: number
    soldier: number
    defender: number
  }
  ssd: {
    harvester: number
    soldier: number
    defender: number
  }
  psu: {
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
      cpu: { harvester: 0, soldier: 0, defender: 0 },
      gpu: { harvester: 0, soldier: 0, defender: 0 },
      ram: { harvester: 0, soldier: 0, defender: 0 },
      ssd: { harvester: 0, soldier: 0, defender: 0 },
      psu: { harvester: 0, soldier: 0, defender: 0 },
    },
    states: {
      running: {
        on: {
          SEND_UNIT: {
            actions: 'updateUnit'
          },
          RECALL_UNIT: {
            actions: 'updateUnit'
          },
          KILL_UNIT: {
            actions: 'updateUnit'
          }
        }
      }
    }
  },
  {
    actions: {
      updateUnit: assign((ctx, event) => {
        const { part, unit } = event
        const inc = event.type === 'SEND_UNIT' ? 1 : -1

        return {
          [part]: {
            ...ctx[part],
            [unit]: ctx[part][unit] + inc
          }
        }
      }),
    }
  }
)

export const computer = interpret(machine)

computer.start()
