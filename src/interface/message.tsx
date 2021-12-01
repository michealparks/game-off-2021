import { useEffect } from 'react'
import { useMessage } from '../hooks/message'
import { message } from '../machines/message'


const Message = () => {
  const [state] = useMessage()

  if (!state.context.text) {
    return null
  }

  return (
    <div className='mb-4 bg-red-500 p-4 flex gap-4 items-center justify-center text-xs sm:text-sm'>
      <i className='icon-alert-triangle' />
      {state.context.text}
      <i className='icon-alert-triangle' />
    </div>
  )
}

let id: number

export const showMessage = (text: string, timeout = 10) => {
  message.send({ type: 'SET_TEXT', text })
  
  if (id) {
    clearTimeout(id)
  }

  id = setTimeout(() => {
    message.send({ type: 'REMOVE_TEXT' })
  }, timeout * 1000)
}

export default Message
