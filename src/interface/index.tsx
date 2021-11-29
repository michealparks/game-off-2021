
import { useEffect } from 'react'
import { useGame } from '../hooks/game'
import { audio } from '../util/audio'
import Stats from './stats'
import Button from './button'
import cn from 'classnames'

const Interface = () => {
  const [state, send] = useGame()

  useEffect(() => {
    send({ type: 'START', energy: 10 })
  }, [])

  return (
    <div className={cn(
      'absolute inset-0 pointer-events-none h-full w-full z-10 flex flex-col justify-between items-end',
      'select-none text-white'
    )}>
      <Stats />

      <div className='p-2 pointer-events-auto'>
        <Button
          onClick={() => {
            audio.play('click')
            send({ type: 'PAUSE' })
          }}
          label='pause'
        />
      </div>

      {state.matches('ended') && (
        <p>Ended</p>
        
      )}

      {state.matches('paused') && (
        <div className={cn(
          'absolute z-50 w-full h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm',
          'grid place-content-center pointer-events-auto text-white'
        )}>
          <h2 className='uppercase text-8xl'>
            Paused
          </h2>
          <Button
            onClick={() => {
              audio.play('click')
              console.log('unpause')
              send({ type: 'UNPAUSE' })
            }}
            label='resume'
          />
        </div>
      )}
    </div>
  )
}

export default Interface
