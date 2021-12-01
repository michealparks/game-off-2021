import { createMachine, interpret, assign } from 'xstate'
import { computer } from './computer'
import { Part, parts } from './constants'

interface Context {
  interval: number
  focus: null | Part
}

type Events = 
  | { type: 'START' }
  | { type: 'TICK' }

const flip = () => Math.random() > 0.5

const machine = createMachine<Context, Events>(
  {
    id: 'ai',
    initial: 'idle',
    context: {
      interval: 5,
      focus: null
    },
    states: {
      idle: {
        on: {
          START: {
            actions: 'start',
            target: 'running',
          },
        },
      },
      running: {
        invoke: { src: 'tick' },
        on: {
          TICK: {
            actions: ['decideFocus', 'process'],
            target: 'running',
          },
        },
      },
    }
  }, {
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

        return {}
      }),
      decideFocus: assign((_ctx, event) => {
        if (event.type !== 'TICK') return {}

        console.log('focusing')

        if (flip()) return {}

        if (flip()) {
          return { focus: null }
        } else if (flip()) {
          let i = 0
          const p = [...parts].sort(() => Math.random() - 0.5)
          for (const name of parts) {
            const part = computer.state.context[name]
            console.log(part)
            if (part.harvester > 0 || part.soldier > 0) {
              return { focus: name }
            }
          }
        }

        return { focus: parts[Math.random() * parts.length | 0]! }
      }),
      process: assign((ctx, _event) => {
        if (ctx.focus === null) return {}

        if (flip()) {
          const part = computer.state.context[ctx.focus]
          if (part.soldier) {
            let chanceToKill = 1 - (part.soldier / 10)
            if (Math.random() > chanceToKill) {
              computer.send({
                type: 'KILL_UNIT',
                unit: flip() ? 'harvester' : 'soldier',
                part: ctx.focus
              })
            }
          }
        }

        return {}
      }),
    },
  }
)

export const ai = interpret(machine)

ai.start()
