import React from 'react'

interface Props {
  label: string
  className?: string
  onClick?(): void
}

const Button = ({ label, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`px-2 py-1 border rounded ${className ?? ''}`}
    >
      {label}
    </button>
  )
}

export default Button