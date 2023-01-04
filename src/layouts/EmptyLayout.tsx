import type { PropsWithChildren } from 'react'
export default function EmptyLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
      <main className={`mx-auto flex h-full w-full grow flex-col ${className}`}>
        {children}
      </main>
  )
}
