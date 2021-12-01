import { createMachine, interpret, assign } from 'xstate'

interface Context {
  text: null | string
}

type Events = 
  | { type: 'SET_TEXT', text: string }
  | { type: 'REMOVE_TEXT' }

const machine = createMachine<Context, Events>(
  {
    id: 'message',
    initial: 'running',
    context: {
      text: null
    },
    states: {
      running: {
        on: {
          SET_TEXT: {
            actions: 'display'
          },
          REMOVE_TEXT: {
            actions: 'remove'
          }
        }
      }
    }
  },
  {
    actions: {
      display: assign((_ctx, event) => {
        if (event.type !== 'SET_TEXT') return {}

        return { text: event.text }
      }),
      remove: assign((_ctx, event) => {
        if (event.type !== 'REMOVE_TEXT') return {}

        return { text: null }
      })
    }
  }
)

export const message = interpret(machine)

message.start()
