import type { PropsWithChildren } from 'react'
import Navbar from '../components/Navbar'

export default function HomepageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex h-full w-full grow flex-col">
        {children}
      </main>
    </>
  )
}
