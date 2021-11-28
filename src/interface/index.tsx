import { useEffect } from 'react'
import { useGame } from '../hooks/game'
import { COST } from '../machines/constants'
import { player } from '../machines/player'
import Stats from './stats'
import Button from './button'

const Interface = () => {
  const [state, send] = useGame()

  useEffect(() => {
    send({
      type: 'START',
      resources: {
        energy: 10,
        harvester: 5,
        soldier: 5,
      }
    })
  }, [])

  return (
    <div className='absolute inset-0 pointer-events-none h-full w-full z-10 flex flex-col justify-between items-end select-none text-white'>
      <Stats />

      <div className='p-2 pointer-events-auto'>
        <Button
          onClick={() => send('PAUSE')}
          label='pause'
        />

        <Button
          onClick={() => player.send({ type: 'BUILD_UNIT', unit: 'harvester' })}
          label={`Build harvester (-${COST.harvester})`}
        />

        <Button
          onClick={() => player.send({ type: 'BUILD_UNIT', unit: 'soldier'})}
          label={`Build soldier (-${COST.soldier})`}
        />
      </div>

      {state.matches('ended') && (
        <p>Ended</p>
      )}

      {state.matches('paused') && (
        <div className='absolute z-50 w-full h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm grid place-content-center pointer-events-auto text-white'>
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
