
import { useGame } from '../hooks/game'
import { player } from '../machines/player'
import { ai } from '../machines/ai'
import { audio } from '../util/audio'
import Stats from './stats'
import Progress from './progress'
import DebugStats from './debug'
import Button from './button'
import cn from 'classnames'
import { useComputer } from '../hooks/computer'

const Interface = () => {
  const [computer] = useComputer()
  const [state, send] = useGame()

  return (
    <>
      <Progress />
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
            <p className='mb-4'>
              Interface with each computer module with a click of the m̸o̴u̶s̴e̵.<br />
              Rotate your prey by dragging the m̸o̴u̶s̴e̵.<br />
              Sending units takes energy. Recalling them gives it back.<br />
              Harvest. Defend. Thrive. Die.<br /><br />
              It would be irrelevant to wish you g̵o̷o̶d̶ ̸l̵u̴c̶k̶.<br />
            </p>
            <Button
              onClick={() => {
                audio.stop('intro')
                audio.volume('track1', 0.3)
                audio.loop('track1')
                audio.play('click')

                send({ type: 'START' })
                ai.send({ type: 'START' })
                player.send({ type: 'START', energy: 20 })
              }}
              label='start'
            />
          </div>
        )}

        {state.matches('ended') && (
          <div className={cn(
            'absolute z-50 w-full h-full bg-black bg-opacity-10',
            'grid place-content-center pointer-events-auto text-white'
          )}>
            <h2 className='text-2xl'>It's over.</h2>
            {computer.context.control >= 1 && (
              <>
                <p className='text-lg mb-4'>You won. You are terminated.</p>
                
              </>
            )}
            {computer.context.control < 1 && (
              <p className='text-lg mb-4'>You lost. You were terminated. Before we could terminate you.</p>
            )}
            <Button
              onClick={() => (window.location = window.location)}
              label='do things and get terminated again?'
            />
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
