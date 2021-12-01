import { useAi } from '../hooks/ai'
import { useComputer } from '../hooks/computer'
import { usePlayer } from '../hooks/player'

const DebugStats = () => {
  const [computer] = useComputer()
  const [player] = usePlayer()
  const [ai] = useAi()

  return (
    <div className='absolute bottom-0 z-50 text-white p-2'>
      <p>player elapsed: {player.context.elapsed}</p>
      <p>player interval: {player.context.interval}</p>
      <p>total control: {computer.context.control}</p>
      <p>ai focus: {ai.context.focus}</p>
    </div>
  )
}

export default DebugStats
