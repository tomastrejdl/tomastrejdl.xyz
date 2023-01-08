import React, { type ReactNode } from 'react'
import Tooltip from './Tooltip'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltip?: string | ReactNode | null
  className?: string
  onClick?: () => void
}

const Button = ({
  children,
  tooltip,
  className = '',
  onClick = () => null,
  ...props
}: ButtonProps) => {
  if (!tooltip)
    return (
      <button
        className={`flex items-center justify-center rounded-md bg-neutral-200/50 px-4 py-2 hover:bg-neutral-100 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  else
    return (
      <Tooltip
        tooltipContent={tooltip}
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </Tooltip>
    )
}

export default Button
