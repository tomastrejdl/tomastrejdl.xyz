import { type PropsWithChildren } from 'react'
import Footer from '../components/Footer'
import MobileNavbar from '../components/MobileNavbar'
import Navbar from '../components/Navbar'
import AnimatedLayout from './AnimatedLayout'

export default function HomepageLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <>
      <Navbar />
      <AnimatedLayout>
        <main
          className={`mx-auto mt-10 flex h-full w-full grow flex-col sm:mt-12 md:mt-16 lg:mt-20 ${className}`}
        >
          {children}
        </main>
      </AnimatedLayout>
      <Footer />
      <MobileNavbar className="fixed right-0 bottom-0 left-0 z-20 p-2 md:hidden" />
    </>
  )
}
