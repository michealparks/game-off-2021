import React from 'react'
import cn from 'classnames'

interface Props {
  label: string
  className?: string
  onClick?(): void
  disabled?: boolean
}

const Button = ({ label, onClick, className, disabled = false }: Props) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={cn(
        'px-2 py-1 border rounded disabled:opacity-50 disabled:cursor-auto',
        className
      )}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
