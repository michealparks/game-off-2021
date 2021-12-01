import { createMachine, interpret, assign } from 'xstate'
import { computer } from './computer'
import { Part, parts } from './constants'
import { showMessage } from '../interface/message'

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
        const { control } = computer.state.context

        if (flip()) return {}

        if (control < 0.5 && flip()) {
          return { focus: null }
        } else if ((control < 0.6 && flip()) || control >= 0.6) {
          console.log('laser focusing')

          let i = 0
          const p = [...parts].sort(() => Math.random() - 0.5)
          for (const name of parts) {
            const part = computer.state.context[name]
            if (part.harvester > 0 || part.soldier > 0) {
              return { focus: name }
            }
          }
        }

        return { focus: parts[Math.random() * parts.length | 0]! }
      }),
      process: assign((ctx, _event) => {
        if (ctx.focus === null) return {}

        const { focus } = ctx
        const { control } = computer.state.context

        if ((control < 0.6 && flip()) || control >= 0.6) {
          const part = computer.state.context[focus]
          if (part.soldier) {
            let chanceToKill = 1 - (part.soldier / 10)
            if (Math.random() > chanceToKill) {
              const unit = flip() ? 'harvester' : 'soldier'

              showMessage(part[unit] <= 0
                ? `system installed anti${unit} in ${focus}`
                : `system killed ${unit} in ${focus}`, 5)

              computer.send({
                type: 'KILL_UNIT',
                unit,
                part: focus
              })
            }
          } else {
            const unit = 'harvester'
            showMessage(part[unit] <= 0
              ? `system installed anti${unit} in ${focus}`
              : `system killed ${unit} in ${focus}`, 5)

            computer.send({
              type: 'KILL_UNIT',
              unit,
              part: focus,
            })
          }
        }

        return {}
      }),
    },
  }
)

export const ai = interpret(machine)

ai.start()
