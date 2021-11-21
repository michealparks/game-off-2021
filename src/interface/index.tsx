import React from 'react'
import { useActor } from '@xstate/react'
import { game } from '../machines/game'
import Button from './button'

const Interface = () => {
  const [state, send] = useActor(game)

  return (
    <div className='absolute inset-0 pointer-events-none h-full w-full z-10 flex flex-col justify-between items-end select-none'>

      {state.matches('paused') && (
        <div className='absolute w-full h-full bg-black bg-opacity-50 grid place-content-center pointer-events-auto'>
          <p>Paused</p>
          <Button
            onClick={() => send('START')}
            label='resume'
          />
        </div>
      )}
      
      {state.matches('ended') && <p>Ended</p>}

      <div className='p-2'>
        <h4>Resources</h4>
        <p>Energy: {state.context.energy}</p>
        <p>Harvesters: {state.context.harvester}</p>
        <p>Soldiers: {state.context.soldier}</p>
      </div>

      <div className='p-2 pointer-events-auto'>
        <Button
          onClick={() => send('PAUSE')}
          label='pause'
        />

        <Button
          onClick={() => send({ type: 'BUILD_UNIT', unit: 'harvester' })}
          label='Build harvester'
        />

        <Button
          onClick={() => send({ type: 'BUILD_UNIT', unit: 'soldier'})}
          label='Build soldier'
        />

      </div>
    </div>
  )
}

export default Interface