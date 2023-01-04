import { type PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function AnimatedLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  return (
    <AnimatePresence>
      <motion.div
        key={router.route}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3, ease: 'easeOut', bounce: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
