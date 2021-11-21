import { Html } from '@react-three/drei'

interface Props {
  name: string
  harvesters: number
  soldiers: number
  onClose(): void
}

const Interface = ({ name, harvesters, soldiers, onClose }: Props) => {
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
      <p>Harvesters: {harvesters}</p>
      <p>Solidiers: {soldiers}</p>
      <button type='button' className='border rounded border-white px-2 py-1' onClick={onClose}>Done</button>
    </Html>
  )
}

export default Interface
