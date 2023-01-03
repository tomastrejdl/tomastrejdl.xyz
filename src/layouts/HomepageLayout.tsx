import type { PropsWithChildren } from 'react'
import MobileNavbar from '../components/MobileNavbar'
import Navbar from '../components/Navbar'

export default function HomepageLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <>
      <Navbar />
      <main className={`mx-auto flex h-full w-full grow flex-col ${className}`}>
        {children}
      </main>
      <MobileNavbar className="z-20 -m-1 md:hidden" />
    </>
  )
}
