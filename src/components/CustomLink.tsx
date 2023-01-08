import { type PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

export interface CustomLinkProps extends PropsWithChildren<LinkProps> {
  className?: string
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>
  isTextLink?: boolean
  isActive?: boolean
}

export function CustomLink({
  children,
  className,
  isTextLink = true,
  isActive = false,
  ...props
}: CustomLinkProps) {
  const isExternal = props.href.toString().startsWith('http')

  return (
    <Link
      {...props}
      target={isExternal ? '_blank' : undefined}
      className={`${
        isTextLink &&
        'underline decoration-dotted decoration-2 underline-offset-4 hover:text-neutral-500 dark:hover:text-neutral-500'
      } ${
        !isTextLink && isActive
          ? 'font-semibold text-black dark:text-white'
          : ''
      } ${isExternal && 'mr-1'} ${className} `}
    >
      {children}
      {isExternal && <ArrowUpRightIcon className="ml-1 mb-2 inline h-3 w-3" />}
    </Link>
  )
}
