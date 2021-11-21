import { Html } from '@react-three/drei'
import { useGame } from '../hooks/game'
import { Module } from '../machines/game'

interface Props {
  name: Module
}

const Button = ({ onClick, label, className }: { onClick(): void, label: string, className?: string }) => {
  return (
    <button
      type='button'
      className={`border border-white px-2 py-1 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

const Interface = ({ name }: Props) => {
  const [state, send] = useGame()
  const { harvester, soldier } = state.context.allocations

  return (
    <Html
      as='div'
      distanceFactor={0.25}
      zIndexRange={[100, 0]}
      transform
      sprite
      className='text-white bg-gray-800 text-xs p-2 select-none'
    >
      <p>{name}</p>
      <p>
        Harvesters: {harvester[name]}
        <Button
          label='+'
          onClick={() => send({ type: 'ALLOCATE_UNIT', unit: 'harvester', part: name })}
        />
        <Button
          label='-'
          onClick={() => send({ type: 'RECALL_UNIT', unit: 'harvester', part: name })}
        />
      </p>
      <p>
        Soldiers: {soldier[name]}
        <Button
          label='+'
          onClick={() => send({ type: 'ALLOCATE_UNIT', unit: 'soldier', part: name })}
        />
        <Button
          label='-'
          onClick={() => send({ type: 'RECALL_UNIT', unit: 'soldier', part: name })}
        />
      </p>

      <Button
        label='Done'
        onClick={() => send({ type: 'VIEW_MODULE', module: null })}
      />
    </Html>
  )
}

export default Interface
