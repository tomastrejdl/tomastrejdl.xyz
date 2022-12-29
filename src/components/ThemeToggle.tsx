import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="fixed right-4 -mr-[10px] flex h-10 w-10 items-center justify-center rounded-md bg-neutral-200/50 backdrop-blur-sm dark:bg-neutral-800/50 sm:right-6 lg:right-8"
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
  )
}
