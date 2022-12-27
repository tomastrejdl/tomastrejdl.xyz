import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { DribbbleLogo } from './icons/DribbbleLogo'
import { GitHubLogo } from './icons/GitHubLogo'
import { InstagramLogo } from './icons/InstagramLogo'
import { LinkedInLogo } from './icons/LinkedInLogo'
import Link from './NoScrollLink'

const links: { name: string; href: string; icon: JSX.Element }[] = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/tomastrejdl',
    icon: InstagramLogo,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/tomastrejdl',
    icon: LinkedInLogo,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/tomastrejdl',
    icon: GitHubLogo,
  },
  {
    name: 'Dribbble',
    href: 'https://dribbble.com/tomastrejdl',
    icon: DribbbleLogo,
  },
]

const SocialLogos = (): JSX.Element => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <nav className="flex">
      {links.map(({ name, href, icon }) => (
        <div
          onMouseEnter={() => setSelected(name)}
          onMouseLeave={() => setSelected(null)}
          key={name}
        >
          <Link key={name} href={href}>
            <div className="p-4">
              <div className="relative z-10">{icon}</div>
              <AnimatePresence>
                {selected === name && (
                  <motion.div
                    layoutId="social-icons-hover-effect"
                    className={`absolute -mt-10 -ml-2 h-12 w-12 bg-black/10 dark:bg-white/20 ${
                      selected === 'Instagram' && 'rounded-xl'
                    } ${selected === 'LinkedIn' && 'rounded'} ${
                      (selected === 'GitHub' || selected == 'Dribbble') &&
                      'rounded-full'
                    }`}
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
            </div>
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default SocialLogos
