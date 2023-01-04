import { ArrowUpIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import { CustomLink } from './CustomLink'

export default function Footer({ className }: { className?: string }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer
      className={`relative mb-16 mt-8 flex w-full flex-col items-center justify-center gap-4 md:mt-24 md:mb-0  ${className}`}
    >
      <div className="pointer-events-none right-0 mb-8 flex w-full items-center justify-end md:absolute md:bottom-0 md:mb-0">
        <Button
          onClick={scrollToTop}
          tooltip="Scroll to top"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-md bg-neutral-200/50 backdrop-blur-sm dark:bg-neutral-800/50"
          aria-label="Scroll to top"
        >
          <span className="sr-only">Scroll to top</span>
          <ArrowUpIcon className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
        </Button>
      </div>

      <div className="flex w-full flex-wrap items-baseline justify-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
        <span>© 2023 Tomáš Trejdl</span>•
        <span>Designed and built in Prague</span>•
        <CustomLink
          className="whitespace-nowrap underline hover:text-neutral-900 dark:hover:text-neutral-400"
          href="https://github.com/tomastrejdl/tomastrejdl.xyz"
        >
          Source on GitHub
        </CustomLink>
      </div>
    </footer>
  )
}
