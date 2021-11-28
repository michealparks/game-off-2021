import { usePlayer } from '../hooks/player'

const Stats = () => {
  const [state] = usePlayer()
  const { context } = state
  let energy = context.energy.toString()

  if (energy.split('.').length === 1) energy = `${energy}.00`
  else if (energy.split('.').pop()?.length === 1) energy = `${energy}0`

  return (
    <div className='p-2'>
      <p>elapsed: {context.elapsed}</p>
      <p>interval: {context.interval}</p>
      <h4>resources</h4>
      <p>energy: {energy}</p>
      <p>harvesters: {context.harvester} / {context.maxHarvester}</p>
      <p>soldiers: {context.soldier} / {context.maxSoldier}</p>
    </div>
  )
}

export default Stats
