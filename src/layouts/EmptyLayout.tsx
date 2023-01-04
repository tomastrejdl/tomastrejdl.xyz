import type { PropsWithChildren } from 'react'
import AnimatedLayout from './AnimatedLayout'

export default function EmptyLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <AnimatedLayout>
      <main className={`mx-auto flex h-full w-full grow flex-col ${className}`}>
        {children}
      </main>
    </AnimatedLayout>
  )
}
