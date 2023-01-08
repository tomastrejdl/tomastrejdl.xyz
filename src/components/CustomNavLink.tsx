import { useRouter } from 'next/router'
import { CustomLink, type CustomLinkProps } from './CustomLink'

interface CustomNavLinkProps extends CustomLinkProps {
  boldWhenActive?: boolean
}

export function CustomNavLink({
  children,
  boldWhenActive = false,
  ...props
}: CustomNavLinkProps) {
  const router = useRouter()
  const isActive = router.pathname === props.href

  return (
    <CustomLink
      isTextLink={false}
      isActive={boldWhenActive && isActive}
      {...props}
    >
      {children}
    </CustomLink>
  )
}
