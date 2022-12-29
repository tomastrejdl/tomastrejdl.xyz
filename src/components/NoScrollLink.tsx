import Link, { type LinkProps } from 'next/link'
import React, { type ReactNode } from 'react'

interface NoScrollLinkProps extends LinkProps {
  children: ReactNode
}

const NoScrollLink = ({ children, href, passHref }: NoScrollLinkProps) => (
  <Link href={href} passHref={passHref} scroll={false}>
    {children}
  </Link>
)

export default NoScrollLink
