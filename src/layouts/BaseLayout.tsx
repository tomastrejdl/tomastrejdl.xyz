import type { PropsWithChildren } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex h-full w-full grow flex-col sm:mt-12 md:mt-16 lg:mt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
