import React, { type ReactNode } from 'react'
import Tooltip from './Tooltip'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltip?: string | ReactNode
  className: string
  onClick: () => void
}

const Button = ({
  children,
  tooltip,
  className,
  onClick,
  ...props
}: ButtonProps) => (
  <Tooltip
    tooltipContent={tooltip}
    className={className}
    onClick={onClick}
    {...props}
  >
    {children}
  </Tooltip>
)

export default Button
