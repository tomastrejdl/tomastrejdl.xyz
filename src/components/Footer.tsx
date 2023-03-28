import { ArrowUpIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import { CustomLink } from './CustomLink'
import { CustomNavLink } from './CustomNavLink'

export default function Footer({ className }: { className?: string }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const footerLinks = [
    {
      title: 'Sitemap',
      links: [
        {
          name: 'Home',
          href: '/',
        },
        {
          name: 'Projects',
          href: '/projects',
        },
        {
          name: 'About',
          href: '/about',
        },
      ],
    },
    {
      title: 'Follow me',
      links: [
        {
          name: 'Twitter',
          href: 'https://twitter.com/tomastrejdl',
        },
        {
          name: 'Dribbble',
          href: 'https://dribbble.com/tomastrejdl',
        },
        {
          name: 'LinkedIn',
          href: 'https://linkedin.com/in/tomastrejdl',
        },
        // {
        //   name: 'Instagram',
        //   href: 'https://instagram.com/tomastrejdl',
        // },
      ],
    },
    {
      title: 'Featured Projects',
      links: [
        {
          name: 'Wrest',
          href: '/projects/wrest',
        },
        {
          name: 'Smart Triage',
          href: '/projects/smart-triage',
        },
        {
          name: 'Smart Home',
          href: '/projects/smart-home-platform',
        },
      ],
    },
  ]

  return (
    <footer
      className={`relative mb-16 mt-8 flex w-full flex-col items-center justify-center gap-4 md:mt-24 md:mb-0 ${className}`}
    >
      <div className="pointer-events-none right-0 flex w-full items-center justify-end md:absolute md:bottom-0">
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

      <section className="my-4 grid w-full max-w-prose grid-cols-1 gap-8 text-neutral-600 dark:text-neutral-400 sm:my-8 sm:grid-cols-3">
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-light uppercase">{col.title}</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.name}>
                  <CustomNavLink href={link.href}>{link.name}</CustomNavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="flex w-full flex-wrap items-baseline justify-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
        <span>© 2023 Tomáš Trejdl</span>•
        <span>Designed and built in Prague</span>•
        <CustomLink
          className="whitespace-nowrap"
          href="https://github.com/tomastrejdl/tomastrejdl.xyz"
        >
          Source on GitHub
        </CustomLink>
      </div>
    </footer>
  )
}
