import { ArrowUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Button from './Button'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-between">
        <span>Tomáš Trejdl</span>
        <Button
          onClick={scrollToTop}
          tooltip="Scroll to top"
          className="h-10 w-10"
          aria-label="Scroll to top"
        >
          <span className="sr-only">Scroll to top</span>
          <ArrowUpIcon className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
        </Button>
      </div>

      <div className="mx-auto w-full text-center text-xs text-neutral-500 dark:text-neutral-500">
        <span>© 2023 Tomáš Trejdl | </span>
        <span>Designed and built in Prague | </span>
        <Link
          className="whitespace-nowrap underline hover:text-neutral-900 dark:hover:text-neutral-400"
          href="https://github.com/tomastrejdl/tomastrejdl.xyz"
          target={'_blank'}
        >
          Source on GitHub
        </Link>
      </div>
    </footer>
  )
}
