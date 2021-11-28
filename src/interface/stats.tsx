import { usePlayer } from '../hooks/player'

const Stats = () => {
  const [state] = usePlayer()
  const { context } = state

  return (
    <div className='p-2'>
      <p>elapsed: {context.elapsed}</p>
      <p>interval: {context.interval}</p>
      <h4>resources</h4>
      <p>energy: {context.energy}</p>
      <p>harvesters: {context.harvester} / {context.maxHarvester}</p>
      <p>soldiers: {context.soldier} / {context.maxSoldier}</p>
    </div>
  )
}

export default Stats
