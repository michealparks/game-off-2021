import cn from 'classnames'
import { Html } from '@react-three/drei'
import { useGame } from '../hooks/game'
import { useComputer } from '../hooks/computer'
import { Part, Unit } from '../machines/constants'
import { usePlayer } from '../hooks/player'
import { audio } from '../util/audio'

interface Props {
  name: Part
  description: string
}

const Button = ({ onClick, label, className }: { onClick(): void, label?: string, className?: string }) => {
  return (
    <button
      type='button'
      className={`px-2 py-1 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

interface ButtonProps {
  unit: Unit
  part: Part
}

const Buttons = ({ unit, part }: ButtonProps) => {
  const [state, send] = usePlayer()
  const { elapsedCooldown, cooldown } = state.context
  const hasCooldown = elapsedCooldown[unit] > 0

  return (
    <div className='relative overflow-hidden border rounded border-white bg-opacity-50'>
      {hasCooldown && <div
        style={{transform: `scale(${1 - (elapsedCooldown[unit] / cooldown)}, 1)`}}
        className='absolute w-full h-full bg-white origin-left transition-transform duration-500'
      />}
      <Button
        className={cn('icon-plus border-r border-white', {
          'invisible pointer-events-none': hasCooldown
        })}
        onClick={() => {
          audio.play('click')
          send({ type: 'SEND_UNIT', unit, part })
        }}
      />
      <Button
        className={cn('icon-minus', {
          'invisible pointer-events-none': hasCooldown
        })}
        onClick={() => {
          audio.play('click')
          send({ type: 'RECALL_UNIT', unit, part })
        }}
      />
    </div>
  )
}

const Interface = ({ name, description }: Props) => {
  const [, send] = useGame()
  const [computer] = useComputer()
  const { harvester, soldier } = computer.context[name]

  return (
    <Html
      as='div'
      distanceFactor={0.5}
      zIndexRange={[10, 0]}
      sprite
      className='text-white bg-gray-800 text-xs p-3 cursor-default select-none min-w-[12rem] rounded-md'
    >
      <div className='flex justify-between items-center'>
        <h3 className='text-base'>{name}</h3>
        <button
          onClick={() => {
            audio.play('click')
            send({ type: 'VIEW_MODULE', module: null })
          }}
          className='icon-x p-2'
        />
      </div>

      <p className='my-2'>
        {description}
      </p>

      <div className='flex items-center justify-between gap-1 my-1'>
        <div>Harvesters</div>
        <div>{harvester}</div>

        <Buttons unit='harvester' part={name} />
      </div>

      <div className='flex items-center justify-between gap-1 my-1'>
        <div>Soldiers</div>
        <div>{soldier}</div>

        <Buttons unit='soldier' part={name} />
      </div>
    </Html>
  )
}

export default Interface
