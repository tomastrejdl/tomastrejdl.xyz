import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
    const lightModePreference = window.matchMedia(
      '(prefers-color-scheme: light)'
    )

    darkModePreference.addEventListener(
      'change',
      (e) => e.matches && setTheme('dark'),
      { passive: true }
    )

    lightModePreference.addEventListener(
      'change',
      (e) => e.matches && setTheme('light'),
      { passive: true }
    )
  }, [setTheme])

  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="pointer-events-none fixed right-0 top-0 left-0 z-30 mx-auto flex w-full max-w-4xl items-center justify-end p-4 sm:p-6 lg:p-8">
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-md bg-neutral-200/50 backdrop-blur-sm dark:bg-neutral-800/50"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        onMouseEnter={() => setSelected('theme-toggle')}
        onMouseLeave={() => setSelected(null)}
      >
        {mounted &&
          (resolvedTheme === 'light' ? (
            <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          ) : (
            <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          ))}
        <AnimatePresence>
          {selected === 'theme-toggle' && (
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
      </button>
    </div>
  )
}
