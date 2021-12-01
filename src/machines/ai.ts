import { createMachine, interpret, assign } from 'xstate'

interface Context {
  interval: number
}

type Events = 
  | { type: 'START' }
  | { type: 'TICK' }

  const machine = createMachine<Context, Events>(
  {
    id: 'ai',
    initial: 'idle',
    context: {
      interval: 0.1,
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
            actions: 'process',
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
      })
    },
  }
)

export const ai = interpret(machine)

ai.start()
