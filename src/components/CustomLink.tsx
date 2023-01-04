import { type PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

export interface CustomLinkProps extends PropsWithChildren<LinkProps> {
  className?: string
}

export function CustomLink({ children, className, ...props }: CustomLinkProps) {
  const isExternal = props.href.toString().startsWith('http')
  return (
    <Link
      {...props}
      target={isExternal ? '_blank' : undefined}
      className={className}
    >
      {children}
      {isExternal && <ArrowUpRightIcon className="ml-1 mb-2 inline h-3 w-3" />}
    </Link>
  )
}
