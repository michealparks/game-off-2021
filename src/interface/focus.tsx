import { useAi } from "../hooks/ai"

const Focus = () => {
  const [ai] = useAi()
  const { focus } = ai.context

  return (
    <div className='mb-4 text-xs sm:text-base'>
      {focus ? `System is scanning ${focus}...` : ''}
    </div>
  )
}

export default Focus
