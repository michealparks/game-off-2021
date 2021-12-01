
import { useEffect } from 'react'
import { useGame } from '../hooks/game'
import { player } from '../machines/player'
import { audio } from '../util/audio'
import Stats from './stats'
import DebugStats from './debug'
import Button from './button'
import cn from 'classnames'

const Interface = () => {
  const [state, send] = useGame()

  return (
    <>
      {import.meta.env.DEV && <DebugStats />}

      <div className={cn(
        'absolute inset-0 pointer-events-none h-full w-full z-10 flex flex-col justify-between items-end',
        'select-none text-white'
      )}>
        <Stats />

        <div className='p-2 pointer-events-auto'>
          <Button
            onClick={() => {
              audio.play('click')
              audio.toggleLowPassFilter('track1', true)
              send({ type: 'PAUSE' })
            }}
            label='pause'
          />
        </div>

        {state.matches('idle') && (
          <div className={cn(
            'absolute z-50 w-full h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm',
            'grid place-content-center pointer-events-auto text-white'
          )}>
            <Button
              onClick={() => {
                audio.volume('track1', 0.3)
                audio.loop('track1')
                audio.play('click')
                send({ type: 'START' })
                player.send({ type: 'START', energy: 20 })
              }}
              label='start'
            />
          </div>
        )}

        {state.matches('ended') && (
          <div className={cn(
            'absolute z-50 w-full h-full bg-black bg-opacity-30',
            'grid place-content-center pointer-events-auto text-white'
          )}>
            <h2>It's over.</h2>
            
          </div>
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
                audio.toggleLowPassFilter('track1', false)
                send({ type: 'UNPAUSE' })
              }}
              label='resume'
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Interface
