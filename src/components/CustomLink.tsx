import { type PropsWithChildren } from 'react'
import Link, { type LinkProps } from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export interface CustomLinkProps extends PropsWithChildren<LinkProps> {
  className?: string
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>
}

export function CustomLink({ children, className, ...props }: CustomLinkProps) {
  const isExternal = props.href.toString().startsWith('http')
  const router = useRouter()
  const isActive = router.pathname === props.href

  return (
    <Link
      {...props}
      target={isExternal ? '_blank' : undefined}
      className={`mr-1 ${
        isActive ? 'font-semibold text-black dark:text-white' : 'font-normal'
      } ${className} `}
    >
      {children}
      {isExternal && <ArrowUpRightIcon className="ml-1 mb-2 inline h-3 w-3" />}
    </Link>
  )
}
