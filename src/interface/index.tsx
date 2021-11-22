import { useEffect } from 'react'
import { useActor } from '@xstate/react'
import { game } from '../machines/game'
import Button from './button'

const Interface = () => {
  const [state, send] = useActor(game)

  useEffect(() => {
    send({
      type: 'START',
      resources: {
        energy: 100,
        harvester: 5,
        soldier: 5,
      }
    })
  }, [])

  const { energy, harvester, soldier } = state.context

  return (
    <div className='absolute inset-0 pointer-events-none h-full w-full z-10 flex flex-col justify-between items-end select-none'>
      
      {state.matches('ended') && <p>Ended</p>}

      <div className='p-2'>
        <p>Elapsed: {state.context.elapsed}</p>
        <h4>Resources</h4>
        <p>Energy: {energy}</p>
        <p>Harvesters: {harvester}</p>
        <p>Soldiers: {soldier}</p>
      </div>

      <div className='p-2 pointer-events-auto'>
        <Button
          onClick={() => send('PAUSE')}
          label='pause'
        />

        <Button
          disabled={energy === 0}
          onClick={() => send({ type: 'BUILD_UNIT', unit: 'harvester' })}
          label='Build harvester (-5)'
        />

        <Button
          disabled={energy === 0}
          onClick={() => send({ type: 'BUILD_UNIT', unit: 'soldier'})}
          label='Build soldier (-10)'
        />
      </div>

      {state.matches('paused') && (
        <div className='absolute w-full h-full bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm grid place-content-center pointer-events-auto text-white'>
          <h2 className='uppercase text-8xl'>Paused</h2>
          <Button
            onClick={() => send('START')}
            label='resume'
          />
        </div>
      )}
    </div>
  )
}

export default Interface
