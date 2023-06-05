import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CustomNavLink } from './CustomNavLink'
import ThemeToggle from './ThemeToggle'

export const navigation = [
  { name: 'Home', href: '/', mobileOnly: true },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  return (
    <header className="relative flex h-full w-full items-center justify-between">
      <nav className="relative mr-10 flex h-full w-full items-center justify-between">
        <DesktopMenu />
      </nav>
      <ThemeToggle />
    </header>
  )
}

const DesktopMenu = () => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <CustomNavLink
        href="/"
        className="relative -ml-2 flex items-start gap-2 px-3 py-2 text-lg font-medium md:-ml-3"
        onMouseEnter={() => setSelected('name')}
        onMouseLeave={() => setSelected(null)}
      >
        <span className="relative">Tomáš Trejdl</span>
        <AnimatePresence>
          {selected === 'name' && (
            <motion.div
              layoutId="navbar-hover-effect"
              className="absolute inset-0 rounded-md bg-black/10 dark:bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </AnimatePresence>
      </CustomNavLink>
      <ul className="hidden md:ml-10 md:flex md:space-x-8 md:pr-4 ">
        {navigation
          .filter((item) => !item.mobileOnly)
          .map((item) => (
            <li
              key={item.name}
              onMouseEnter={() => setSelected(item.name)}
              onMouseLeave={() => setSelected(null)}
            >
              <CustomNavLink
                boldWhenActive
                href={item.href}
                className="relative block px-3 py-2 text-base text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                <span className="relative">{item.name}</span>
                <AnimatePresence>
                  {selected === item.name && (
                    <motion.div
                      layoutId="navbar-hover-effect"
                      className="absolute inset-0 rounded-md bg-black/10 dark:bg-white/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
              </CustomNavLink>
            </li>
          ))}
      </ul>
    </>
  )
}
