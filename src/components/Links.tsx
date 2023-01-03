import { type PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

export function ExternalLink({
  children,
  className,
  ...props
}: PropsWithChildren<LinkProps & { className?: string }>) {
  return (
    <Link {...props} target={'_blank'} className={className}>
      {children}
      <ArrowUpRightIcon className="ml-1 mb-2 inline h-3 w-3" />
    </Link>
  )
}

export function InternalLink({
  children,
  className,
  ...props
}: PropsWithChildren<LinkProps & { className?: string }>) {
  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  )
}
